const express = require('express');
const router = express.Router();
const dashboard = require('./dashboard');
const excel = require('./excel');
const posts = require('./posts');
const settings = require('./settings');

router.use('/posts', posts);
router.use('/dashboard', dashboard);
router.use('/excel', excel);
router.use('/settings', settings);

module.exports = router;
