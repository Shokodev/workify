const { Users } = require('../../mongodb');
const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const bcrypt = require('bcrypt');
const { roles } = require('../../utils/postmanifest');
const { authenticateToken } = require('./authtoken');

router.get('/users', async (req, res, next) => {
    logger.info('fetch all users from db');
    try{
        res.send(await Users.find({}));
    } catch (err){
        next(err);
    }
});

// Add User
router.post('/register', async (req, res,next) => {
    logger.info('add new user: ' + req.body.username);
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.role = roles.NONE;
        await Users.create(req.body);
        res.status(201).send();

        logger.error("Add User failed: " + err.message);
        next(err);
    } catch (err){
        logger.error("Register user failed: " + err.message);
        next(err);
    }
});

router.put('/update', async (req, res,next) =>{
    logger.info('update user: ' + req.body.nickname);
    try {
        const user = await Users.find({nickname: req.body.nickname});
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await Users.updateOne({nickname: req.body.nickname}, {username: req.body.username});
        await Users.updateOne({nickname: req.body.nickname}, {password: req.body.password});
        await Users.updateOne({nickname: req.body.nickname}, {role: req.body.role});
        res.status(200).send();
    } catch (err){
        logger.error("Update user failed: " + err.message);
        next(err);
    }
});

router.delete('/register', authenticateToken, async(req, res,next) => {
    logger.info('delete User: ' + req.body.nickname);
    try {
        const user = await Users.find({nickname: req.body.nickname});
        if(user.role === roles.ADMIN) {
            await Users.deleteOne({nickname: req.body.nickname});
            res.status(200).send();
        } else {
            res.sendStatus(403);
        }
    } catch (err){
        logger.error("Delete post failed: " + err.message);
        next(err);
    }
});

module.exports = router;
