const { Users } = require('../../mongodb');
const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const bcrypt = require('bcrypt');
const { roles } = require('../../utils/postmanifest');
const { authenticateToken } = require('./authtoken');

router.get('/users', authenticateToken, async(req, res, next) => {
    logger.info('fetch all users from db');
    try {
        res.send(await Users.find({}));
    } catch (err) {
        next(err);
    }
});

// Add User
router.post('/register', async(req, res, next) => {
    logger.info('add new user: ' + req.body.username);
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.role = roles.NONE;
        await Users.create(req.body);
        res.status(201).send();

        logger.error("Add User failed: " + err.message);
        next(err);
    } catch (err) {
        logger.error("Register user failed: " + err.message);
        next(err);
    }
});

router.put('/:id', authenticateToken, async(req, res, next) => {
    logger.info('update user: ' + req.body.user.nickname);
    try {
        if (req.user.role === roles.ADMIN) {
            await Users.updateOne({ _id: req.params.id }, { $set: { nickname: req.body.user.nickname } });
            await Users.updateOne({ _id: req.params.id }, { $set: { username: req.body.user.username } });
            await Users.updateOne({ _id: req.params.id }, { $set: { role: req.body.user.role } });
            res.status(200).send();
        } else {
            res.status(403).send({ message: "Permission denied" });
        }
    } catch (err) {
        logger.error("Update user failed: " + err.message);
        next(err);
    }
});

router.put('/reset/password/:id', authenticateToken, async(req, res, next) => {
    logger.info('reset password for user: ' + req.params.id);
    try {
        if (req.user.role === roles.ADMIN) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await Users.updateOne({ _id: req.params.id }, { $set: { password: req.body.password } });
            res.status(200).send();
        } else {
            res.status(403).send({ message: "Permission denied" });
        }

    } catch (err) {
        logger.error("Update user failed: " + err.message);
        next(err);
    }
});

router.put('/delete/:id', authenticateToken, async(req, res, next) => {
    logger.info('delete User: ' + req.body.nickname);
    try {
        if (req.user.role === roles.ADMIN) {
            await Users.deleteOne({ _id: req.params.id });
            res.status(200).send();
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        logger.error("Delete post failed: " + err.message);
        next(err);
    }
});

module.exports = router;