
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const logger=require('../../logger/logger');

// Get Post
router.get('/', async (req, res) => {
    logger.info('fetch all posts from db');
    try{
        const posts = await loadPostsCollection();
        res.send(await posts.find({}).toArray());
    } catch (err){
        res.status(500).send(err.message);
    }
});

// Add Post
router.post('/', async (req, res) => {
    try {
        const posts = await loadPostsCollection();
        await posts.insertOne({
            item: req.body
        });
        res.status(201).send();
    } catch (err){
        res.status(500).send(err.message);
    }
});

// Delete Post

router.delete('/:id', async (req, res) => {
    try {
        const posts = await loadPostsCollection();
        await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send();
    } catch (err){
        res.status(500).send(err.message);
    }
});


// Update Post
router.put('/:id', async (req, res) =>{
    try {
        const posts = await loadPostsCollection();
        await posts.updateOne({_id: new mongodb.ObjectID(req.params.id)}).then(result=>{
            res.status(200).send();
        });
    } catch (err){
        res.status(500).send(err.message);
    }
});

// Load PostCollection from DB
async function loadPostsCollection()  {
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
