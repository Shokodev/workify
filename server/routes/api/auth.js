const { Users } = require('../../mongodb');
const express = require('express');
const router = express.Router();
const logger = require('../../serverlog/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//TODO check if user exists first, then check if password match
router.post('/login', async (req, res, next) => {
    // Read username and password from request body
    logger.info('login from: ' + req.headers['x-forwarded-for']);
    try {
        const user = await Users.find({nickname: req.body.nickname});
        if(!user.length === 0){
            const match = await bcrypt.compare(req.body.password, user[0].password);
            const expiresIn = process.env.TOKEN_EXPIRES_IN
            if (match) {
                // Generate an access token
                const accessToken = jwt.sign({
                    nickname: req.body.nickname,
                    role: user[0].role,
                }, process.env.TOKEN_SECRET, { expiresIn });
                res.status(200).json({
                    accessToken, user, expiresIn
                });
            } else {
                res.status(401).send( {message: "Wrong password or username"});
            }
        } else {
            res.status(401).send( {message: "Wrong password or username"});
        }
    } catch (err) {
        logger.error('Auth failed:' + err.message);
        next(err);
    }
});

module.exports = router



