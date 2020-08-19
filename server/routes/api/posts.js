
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const logger=require('../../logger/logger');

// Get Post
router.get('/', async (req, res) => {
    logger.info('fetch all posts from db');
    let sendingPosts = null;
    await loadPostsCollection().then(posts=>{
        sendingPosts = posts;
        });
    if(sendingPosts instanceof Error){
        res.send(sendingPosts)
    } else {
        res.send(await sendingPosts.find({}).toArray());
    }
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


// Update Post
router.post('/update', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.updateOne({_id: new mongodb.ObjectID(req.params.id)}).then(result=>{
        res.status(200).send();
    });
});


// LCOAL MONGODB Server: mongodb://localhost:27017/workfly


// Load PostCollection from DB
async function loadPostsCollection() {
    let mongoDB = new Error("DB connection failed!");
    await mongodb.MongoClient.connect('mongodb+srv://workify123:workify123@workify.iukfu.gcp.mongodb.net/workify?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(dbInstance=>{
            logger.info('connect to mongodb: ' + dbInstance.isConnected());
            mongoDB = dbInstance.db('vue_express').collection('posts');
    }).catch(reason => {
        logger.error('cant connect to db: ' + reason);
    });
    return mongoDB;
}



module.exports = router;
