const { StatusCodes } = require('http-status-codes');

const { planets } = require('../models/planet.model');

const getAllPlanets = async (req, res) => {
  return res.status(StatusCodes.OK).json(planets);
};

module.exports = { getAllPlanets };
