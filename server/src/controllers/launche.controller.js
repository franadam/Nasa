const { StatusCodes } = require('http-status-codes');

const launches = require('../models/launche.model');

const getAllLaunches = async (req, res) => {
  return res.status(StatusCodes.OK).json(Array.from(launches.values()));
};

module.exports = { getAllLaunches };
