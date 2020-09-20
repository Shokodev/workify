const express = require('express');
const router = express.Router();
const dashboard = require('./dashboard');
const excel = require('./excel');
const posts = require('./posts');

router.use('/posts', posts);
router.use('/dashboard', dashboard);
router.use('/excel', excel);

module.exports = router;
