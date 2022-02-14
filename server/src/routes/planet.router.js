const express = require('express');
const { getAllPlanets } = require('../controllers/planet.controller');

const router = express.Router();

router.route('/').get(getAllPlanets);

module.exports = router;
