const express = require('express');

const planetRouter = require('./planet.router');
const launcheRouter = require('./launch.route');

const router = express.Router();

router.use('/planets', planetRouter);
router.use('/launches', launcheRouter);

module.exports = router;
