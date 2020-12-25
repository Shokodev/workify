const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const { Posts, Settings } = require('../../mongodb');
const postTypes = require('../../utils/postmanifest');
Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    let newYear = new Date(this.getFullYear(),0,1);
    let day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    let daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    let weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

router.get('/main', async (req, res,next) => {
    logger.info('fetch major data from db for dashboard');
    let dashBoard = {
        labels: ['Floor plan','Plant graphic','Navigation graphic'],
        datasets: [
            {
                label: "Graphic Types",
                data: [],
            },
        ],

    };
    try{
        let data = await Posts.find({});
        let dbSettings = await Settings.find({name: "Settings"});
        dashBoard.totoalGraphics = data.length;
        dashBoard.datasets[0].data.push(await Posts.countDocuments({"item.selectType": postTypes.selectType.FLOOR}));
        dashBoard.datasets[0].data.push(await Posts.countDocuments({"item.selectType": postTypes.selectType.PLANT}));
        dashBoard.datasets[0].data.push(await Posts.countDocuments({"item.selectType": postTypes.selectType.NAV}));
        /*dashBoard.gecc = {};
        dashBoard.gecc.finshed = await Posts.countDocuments({"item.selectState": "Finished"});
        dashBoard.gecc.inProgress = await Posts.countDocuments({"item.selectState": "In Progress"});
        dashBoard.gecc.issues = await Posts.countDocuments({"item.selectState": "Issues"});
        dashBoard.gecc.notStarted = await Posts.countDocuments({"item.selectState": "Not started"});
        dashBoard.siemens = {};
        dashBoard.siemens.auditFaults = await Posts.countDocuments({"item.selectSiemensTested": "Faults"});
        dashBoard.siemens.auditOK = await Posts.countDocuments({"item.selectSiemensTested": "OK"});
        dashBoard.planer = {};
        dashBoard.planer.auditFaults = await Posts.countDocuments({"item.selectPlanerTested": "Faults"});
        dashBoard.planer.auditOK = await Posts.countDocuments({"item.selectPlanerTested": "OK"});*/
        res.send(dashBoard);
    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
        next(err);
    }
});

router.get('/progress', async (req, res,next) => {
    logger.info('fetch progress data from db for dashboard');
    try{
    let data = await Posts.find({});
    let dbSettings = await Settings.find({name: "Settings"});
    let progress = {
        plantGraphics: {
            current: await Posts.countDocuments({"item.selectType": postTypes.selectType.PLANT}),
            expected: dbSettings[0].settings.plantGraphics,
            value: (await Posts.countDocuments({"item.selectType": postTypes.selectType.PLANT}) / dbSettings[0].settings.plantGraphics) *100
        },
        floorPlans: {
            current: await Posts.countDocuments({"item.selectType": postTypes.selectType.FLOOR}),
            expected: dbSettings[0].settings.floorPlan,
            value: (await Posts.countDocuments({"item.selectType": postTypes.selectType.FLOOR}) / dbSettings[0].settings.floorPlan) *100
        },
        navigationsGraphics: {
            current: await Posts.countDocuments({"item.selectType": postTypes.selectType.NAV}),
            expected: dbSettings[0].settings.navigationGraphic,
            value: (await Posts.countDocuments({"item.selectType": postTypes.selectType.NAV}) / dbSettings[0].settings.navigationGraphic) *100
        },
        regulationGraphics: {
            current: getAmountOfRegulationGraphics(data),
            expected: dbSettings[0].settings.regulationsGraphic,
            value: (getAmountOfRegulationGraphics(data) / dbSettings[0].settings.regulationsGraphic) *100
        },
        total:{
            current:  data.length,
            expected: dbSettings[0].settings.calculatedGraphics,
            value: (data.length / dbSettings[0].settings.calculatedGraphics) *100
        }
    };
    res.send(progress);
    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
        next(err);
    }
});

router.get('/weekly', async (req, res,next) => {
    logger.info('fetch gecc data from db for dashboard');
    let weeklyDashboard = {};
    let weeklyGoals = {};
    try{
        let data = await Posts.find({});
        let dataWithFinishedTimestamp = [];
        let firstPost = await Posts.find({}).sort({ "createdAt" : 1 }).limit(1);
        let today = new Date();
        weeklyDashboard = {
            labels: [],
            datasets: [
                {
                    label: "GECC",
                    data: [],
                },
                {
                    label: "Siemens",
                    data: [],
                },
                {
                    label: "Planer",
                    data: [],
                },
                {
                    label: "Closed",
                    data: [],
                },
            ],
        };

        data.forEach(objectWithTimestamp =>{
                if(objectWithTimestamp.meta.finished_at !== (undefined || null)) {
                    dataWithFinishedTimestamp.push(objectWithTimestamp)
                }
            }
        );
        //TODO testCreationDate has to be replaced with the mongoose createdAt
        for (let i = getMonday(firstPost[0].createdAt); i <= today; i = addDays(i,7)) {
            let currentGraphics = dataWithFinishedTimestamp.filter(object =>
                (object.meta.finished_at.getTime() >= i.getTime() &&
                    object.meta.finished_at.getTime() < addDays(i,7).getTime()));
            weeklyDashboard.labels.push("KW " + i.getWeek());

            weeklyDashboard.datasets.find(item => item.label === "GECC")
                .data.push(currentGraphics.filter(object => object.item.selectState === postTypes.state.FINISHED).length);

            weeklyDashboard.datasets.find(item => item.label === "Siemens")
                .data.push(currentGraphics.filter(object => object.item.selectSiemensTested === postTypes.tested.OK).length);

            weeklyDashboard.datasets.find(item => item.label === "Planer")
                .data.push(currentGraphics.filter(object => object.item.selectPlanerTested === postTypes.tested.OK).length);

            weeklyDashboard.datasets.find(item => item.label === "Closed")
                .data.push(currentGraphics.filter(object => object.meta.closed_at !== undefined).length);

        }
        res.send(weeklyDashboard);
    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
        next(err);
    }
});


function getAmountOfRegulationGraphics(data) {
    let regulationGraphics = 0;
    data.forEach(post=>{
      regulationGraphics = regulationGraphics + post.item.regulations
    });
    return regulationGraphics;
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

module.exports = router;
