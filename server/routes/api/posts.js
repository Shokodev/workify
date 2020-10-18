const express = require('express');
const router = express.Router();
const logger=require('../../serverlog/logger');
const { loadPostsCollection } = require('./mongodb');
const mongodb = require('mongodb');
const postTypes = require('../../utils/postmanifest');
//post manifest
const finished = postTypes.state.FINISHED;
const ok = postTypes.tested.OK;

// Get Posts
router.get('/', async (req, res, next) => {
    logger.info('fetch all posts from db');
    try{
        const posts = await loadPostsCollection();
        res.send(await posts.find({}).toArray());
    } catch (err){
        next(err);
    }
});

// Add Post
router.post('/', async (req, res,next) => {
    logger.info('add new graphic: ' + req.body.item.graphic);
    try {
        const posts = await loadPostsCollection();
        req.body.meta = {
            created_at: new Date(),
            finished_at: isFinished(req.body.item)
        };
        await posts.insertOne(
            req.body);
        res.status(201).send();
    } catch (err){
        logger.error("Add post DB failed: " + err.message);
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
        next(err);
    }
});

// Update Post
router.put('/:id', async (req, res,next) =>{
    logger.info('update graphic: ' + req.body.post.item.graphic);
    try {
        const posts = await loadPostsCollection();
        //TODO there should be just one db query!
        let finalPost = comparePosts(await posts.findOne({_id: new mongodb.ObjectID(req.params.id)}),req.body.post);
        for (const [key, value] of Object.entries(finalPost.item)) {
            let propertyName = 'item.' + key
            await posts.updateOne({_id: new mongodb.ObjectID(req.params.id)},{$set:{[propertyName]: value}});
        }
        for (const [key, value] of Object.entries(finalPost.meta)) {
            let propertyName = 'meta.' + key
            await posts.updateOne({_id: new mongodb.ObjectID(req.params.id)},{$set:{[propertyName]: value}});
        }
        res.status(200).send();
    } catch (err){
        logger.error("Update DB failed: " + err.message);
        next(err);
    }
});

function isFinished(post) {
    if(post.selectState === postTypes.state.FINISHED){
        return new Date();
    } else return null
}

function comparePosts(dbPost, newPost) {
    const keys = Object.keys(dbPost.item);
    let finalPost = {
        item:{},
        meta:{}
    }

    for (let key of keys) {
        if (dbPost.item[key] !== newPost.item[key]) {
            finalPost.item[key] = newPost.item[key];
            if(key === "selectState" && (dbPost.item[key] !== finished && newPost.item[key] === finished)){
                finalPost.meta.finished_at = new Date();
            }
            if(key === "selectSiemensTested" && (dbPost.item[key] !== ok && newPost.item[key] === ok)){
                finalPost.meta.okBySiemens_at = new Date();
            }
            if(key === "selectPlanerTested" && (dbPost.item[key] !== ok && newPost.item[key] === ok)){
                finalPost.meta.okByPlaner_at = new Date();
            }
            //TODO Set complete state
        }
    }
    return tryToClosePost(finalPost);
}

function tryToClosePost(post) {
    if(post.meta.selectState === finished && post.meta.selectSiemensTested === ok && post.meta.selectPlanerTested === ok){
        post.meta.closed_at = new Date();
    }
}

module.exports = router;
