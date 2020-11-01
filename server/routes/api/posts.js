const express = require('express');
const router = express.Router();
const logger=require('../../serverlog/logger');
const { Posts } = require('../../mongodb');
const mongodb = require('mongodb');
const postTypes = require('../../utils/postmanifest');
//post manifest
const finished = postTypes.state.FINISHED;
const ok = postTypes.tested.OK;

// Get Posts
router.get('/', async (req, res, next) => {
    logger.info('fetch all posts from db');
    try{
        res.send(await Posts.find({}));
    } catch (err){
        next(err);
    }
});

// Add Post
router.post('/', async (req, res,next) => {
    logger.info('add new graphic: ' + req.body.item.graphic);
    try {
        req.body.meta = {
            finished_at: isFinished(req.body.item)
        };
        await Posts.create(
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
        await Posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send();
    } catch (err){
        logger.error("Delete post failed: " + err.message);
        next(err);
    }
});

//TODO use just update(remove comparePosts)
router.put('/:id', async (req, res,next) =>{
    logger.info('update graphic: ' + req.body.post.item.graphic);
    try {
        //TODO there should be just one db query!
        let finalPost = comparePosts(await Posts.findOne({_id: req.params.id}),req.body.post);
        for (const [key, value] of Object.entries(finalPost.item)) {
            let propertyName = 'item.' + key
            await Posts.updateOne({_id:req.params.id},{$set:{[propertyName]: value}});
        }
        for (const [key, value] of Object.entries(finalPost.meta)) {
            let propertyName = 'meta.' + key
            await Posts.updateOne({_id:req.params.id},{$set:{[propertyName]: value}});
        }
        await tryToClosePost(await Posts.findOne({_id: req.params.id}));
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
        }
    }
    return finalPost;
}
async function tryToClosePost(post) {
    console.log(post);
    if(post.item.selectState === finished && post.item.selectSiemensTested === ok && post.item.selectPlanerTested === ok){
        let value = new Date();
        let propertyName = 'meta.closed_at';
        await Posts.updateOne({_id: post._id},{$set:{[propertyName]: value}});
    }
}
module.exports = router;
