const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const {Settings} = require('../../mongodb');


// Get Posts
router.get('/', async (req, res, next) => {
    logger.info('get settings ' + res.body);
    try{
       let dbSettings = await Settings.find({name: "Settings"});
        if (dbSettings.length === 0){
           await Settings.create({
               name: "Settings",
               settings:{
                   calculatedGraphics: 10000,
                   plantGraphics: 1000,
                   floorPlan: 20,
                   navigationGraphic: 244,
                   regulationsGraphic: 666,
                   requiredGraphicsAtWeek: 50,
                   totalDataPoints: 33333
               }
           });
        }
        res.send(dbSettings[0]);
    } catch (err){
        res.status(500).send(err.message);
        next(err);
    }
});

router.put('/:id' ,async(req,res,next) => {
    logger.info('update settings: ' + res.body);
    try{
        Settings.replaceOne({name: "Settings"}, res.body);
        res.status(200).send();
    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
        next(err);
    }
});



module.exports = router
