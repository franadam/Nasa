const express = require('express');
const {
  httpGetAllLaunches,
  httpCreateLaunche,
  httpDleteLaunche,
} = require('../controllers/launche.controller');

const router = express.Router();

router.route('/').get(httpGetAllLaunches).post(httpCreateLaunche);
router.route('/:flightNumber').delete(httpDleteLaunche);

module.exports = router;
