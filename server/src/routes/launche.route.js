const express = require('express');
const { getAllLaunches } = require('../controllers/launche.controller');

const router = express.Router();

router.route('/').get(getAllLaunches);

module.exports = router;
