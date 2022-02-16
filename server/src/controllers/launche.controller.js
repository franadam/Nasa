const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const {
  getAllLaunches,
  addLaunche,
  destroyLaunche,
} = require('../models/launche.model');

const httpGetAllLaunches = async (req, res) => {
  return res.status(StatusCodes.OK).json(getAllLaunches());
};

const httpCreateLaunche = async (req, res) => {
  let { mission, rocket, launchDate, destination } = req.body;
  if (!mission || !rocket || !launchDate || !destination)
    throw new BadRequestError(
      'mission, rocket, launchDate or destination missing'
    );

  launchDate = new Date(launchDate);
  if (launchDate.toString() === 'Invalid Date')
    throw new BadRequestError('Invalid lunch date');

  return res
    .status(StatusCodes.OK)
    .json(addLaunche({ mission, rocket, launchDate, destination }));
};

const httpDleteLaunche = async (req, res) => {
  const flightNumber = req.params.flightNumber;
  return res.status(StatusCodes.OK).json(destroyLaunche(flightNumber));
};

module.exports = { httpGetAllLaunches, httpCreateLaunche, httpDleteLaunche };
