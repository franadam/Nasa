const express = require('express');
const {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpDleteLaunch,
} = require('../controllers/launch.controller');

const router = express.Router();

router.route('/').get(httpGetAllLaunches).post(httpCreateLaunch);
router.route('/:flightNumber').delete(httpDleteLaunch);

module.exports = router;
