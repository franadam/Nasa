const express = require('express');
const { httpGetAllPlanets } = require('../controllers/planet.controller');

const router = express.Router();

router.route('/').get(httpGetAllPlanets);

module.exports = router;
