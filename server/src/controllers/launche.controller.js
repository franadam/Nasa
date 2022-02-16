const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const {
  getAllLaunches,
  addLaunch,
  launchExist,
  abortLaunch,
} = require('../models/launche.model');

const httpGetAllLaunches = async (req, res) => {
  return res.status(StatusCodes.OK).json(getAllLaunches());
};

const httpCreateLaunch = async (req, res) => {
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
    .json(addLaunch({ mission, rocket, launchDate, destination }));
};

const httpDleteLaunch = async (req, res) => {
  const flightNumber = req.params.flightNumber;
  if (!launchExist(flightNumber)) throw new NotFoundError('Lauch not found');
  return res.status(StatusCodes.OK).json(abortLaunch(flightNumber));
};

module.exports = { httpGetAllLaunches, httpCreateLaunch, httpDleteLaunch };
