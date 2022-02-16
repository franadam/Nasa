const { StatusCodes } = require('http-status-codes');

const { getAllPlanets } = require('../models/planet.model');

const httpGetAllPlanets = async (req, res) => {
  return res.status(StatusCodes.OK).json(getAllPlanets());
};

module.exports = { httpGetAllPlanets };
