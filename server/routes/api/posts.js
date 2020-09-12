const path = require('path');
const excel = require('exceljs');
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const logger=require('../../serverlog/logger');

// Get Posts
router.get('/', async (req, res, next) => {
    logger.info('fetch all posts from db');
    try{
        const posts = await loadPostsCollection();
        res.send(await posts.find({}).toArray());
    } catch (err){
        res.status(500).send(err.message);
        next(err);
    }
});

// Add Post
router.post('/', async (req, res,next) => {
    logger.info('add new graphic: ' + req.body.item.graphic);
    try {
        const posts = await loadPostsCollection();
        await posts.insertOne(
            req.body);
        res.status(201).send();
    } catch (err){
        logger.error("Add post DB failed: " + err.message);
        res.status(500).send(err.message);
        next(err);
    }
});

// Delete Post
router.delete('/:id', async (req, res,next) => {
    logger.info('delete graphic: ' + req.params.id);
    try {
        const posts = await loadPostsCollection();
        await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send();
    } catch (err){
        logger.error("Delete post failed: " + err.message);
        res.status(500).send(err.message);
        next(err);
    }
});

// Update Post
router.put('/:id', async (req, res,next) =>{
    logger.info('update graphic: ' + req.body.post.item.graphic);
    try {
        const posts = await loadPostsCollection();
        await posts.replaceOne({_id: new mongodb.ObjectID(req.params.id)},req.body.post.item);
        res.status(200).send();
    } catch (err){
        logger.error("Update DB failed: " + err.message);
        res.status(500).send(err.message);
        next(err);
    }
});

// Get Dashboard
router.get('/dashboard', async (req, res,next) => {
    logger.info('fetch data from db for dashboard');
    let dashBoard = {};
    try{
        const posts = await loadPostsCollection();
        let data = await posts.find({}).toArray();
        let today = new Date();
       // dashBoard.firstDbRecord = await posts.find().sort({ "item.date" : 1 }).limit(1);
        dashBoard.totoalGraphics = data.length
        dashBoard.floorPlans = await posts.countDocuments({"item.selectType": "Floor plan"});
        dashBoard.plantGrahpics = await posts.countDocuments({"item.selectType": "Plant graphic"});
        dashBoard.navigationGraphics = await posts.countDocuments({"item.selectType": "Navigation graphic"});
        dashBoard.gecc = {};
        dashBoard.gecc.finish = await posts.countDocuments({"item.selectState": "Finish"});
        dashBoard.gecc.inProgress = await posts.countDocuments({"item.selectState": "In Progress"});
        dashBoard.gecc.issues = await posts.countDocuments({"item.selectState": "Issues"});
        dashBoard.gecc.notStarted = await posts.countDocuments({"item.selectState": "Not started"});
        dashBoard.siemens = {};
        dashBoard.siemens.auditFaults = await posts.countDocuments({"item.selectSiemensTested": "Faults"});
        dashBoard.siemens.auditOK = await posts.countDocuments({"item.selectSiemensTested": "OK"});
        dashBoard.planer = {};
        dashBoard.planer.auditFaults = await posts.countDocuments({"item.selectPlanerTested": "Faults"});
        dashBoard.planer.auditOK = await posts.countDocuments({"item.selectPlanerTested": "OK"});
        res.send(dashBoard);
    } catch (err){
        res.status(500).send(err.message);
        next(err);
    }
});

// Get data in excel sheet
router.get('/excel',async (req, res) => {
    logger.info('fetch all posts in excel sheet');
    try{
        const posts = await loadPostsCollection();
        const excelContentData = await posts.find({}).toArray();
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "graphics.xlsx"
        );
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Graphics');
        worksheet.addTable({
            name: 'graphics',
            ref: 'A3',
            headerRow: true,
            totalsRow: false,
            style: {
                theme: 'TableStyleMedium6',
                showRowStripes: true,
            },
            columns: [
                {name: 'Graphics', filterButton: true},
                {name: 'Type', filterButton: true,},
                {name: 'Regulations', filterButton:true},
                {name: 'Date', filterButton: true},
                {name: 'Editor', filterButton: true},
                {name: 'State', filterButton: true},
                {name: 'Comments', filterButton: true},
            ],
            rows:[
                [' ', ' '],
            ],
        });
        const graphicsTable = worksheet.getTable('graphics');
        console.log(excelContentData.length);
        excelContentData.forEach(data => {
            graphicsTable.addRow([
                                        data.item.graphic,
                                        data.item.selectType,
                                        data.item.regulations,
                                        data.item.date,
                                        data.item.editor,
                                        data.item.selectState,
                                        data.item.comments,
                                        ],0);
        });
        graphicsTable.commit();
        worksheet.getCell('A1').value = 'Total graphics:';
        worksheet.getCell('B1').value = excelContentData.length;
        worksheet.mergeCells('A2:G2');
        worksheet.getCell('G2').value = 'Sofia';
        worksheet.columns = [
            {key: 'Graphics', width: 35 },
            {key: 'Type', width: 35 },
            {key: 'Regulations', width: 15 },
            {key: 'Date', width: 20 },
            {key: 'Editor', width: 20 },
            {key: 'State', width: 25 },
            {key: 'Comments', width: 50 },
        ];
        await workbook.xlsx.writeFile("./exports/graphics.xlsx").then(function () {
            logger.info('Excel file saved');
            res.download(path.join(__dirname, '../../../exports/graphics.xlsx'));
        });
    } catch (err){
        logger.error('failed to create excel: ' + err.message);
        res.status(500).send(err.message);
    }
});

// Load PostCollection from DB
async function loadPostsCollection() {
    try {
        const dbInstance = await mongodb.MongoClient.connect('mongodb+srv://workify123:workify123@workify.iukfu.gcp.mongodb.net/workify?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        logger.info('connect to mongodb: ' + dbInstance.isConnected());
        return dbInstance.db('vue_express').collection('posts');
    } catch (err){
        logger.error('cant connect to db: ' + err);
        throw new Error('cant connect to db: ' + err);
    }
}


module.exports = router;
