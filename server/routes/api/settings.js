const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const {loadSettings} = require('./mongodb');
const mongodb = require('mongodb');

// Get Posts
router.get('/', async (req, res, next) => {
    logger.info('get settings');
    try{
        const rawData = await loadSettings();
        const settings = await rawData.find({}).toArray()
        if (settings.length === 0){
           await rawData.insertOne({ settings: {
                   calculatedGraphics: 10000,
                   plantGraphics: 1000,
                   floorPlan: 20,
                   navigationGraphic: 244,
                   regulationsGraphic: 666,
                   requiredGraphicsAtWeek: 50,
                   totalDataPoints: 33333
               }})
        }
        res.send(settings[0]);
    } catch (err){
        res.status(500).send(err.message);
        next(err);
    }
});

router.put('/:id' ,async(req,res,next) => {
    logger.info('update settings: ' + res.body);
    try{
        const settings = await loadSettings();
        settings.updateOne({_id: new mongodb.ObjectID(req.params.id)},{$set:{['settings']: req.body}});
        res.status(200).send();
    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
        next(err);
    }
});



module.exports = router
