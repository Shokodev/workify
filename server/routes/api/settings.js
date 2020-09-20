const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');

// Get Posts
router.get('/', async (req, res, next) => {
    logger.info('get settings');
    try{
        //TODO save in db
       // const posts = await loadPostsCollection();
        res.json({
            requiredGraphicAmount: 10,
            maxGraphics: 2000,
        });
    } catch (err){
        res.status(500).send(err.message);
        next(err);
    }
});

module.exports = router
