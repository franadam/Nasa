const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const {
  getAllLaunches,
  isLaunchExist,
  abortLaunch,
  scheduleNewLaunch,
} = require('../models/launch.model');

const httpGetAllLaunches = async (req, res) => {
  const launches = await getAllLaunches();
  return res.status(StatusCodes.OK).json(launches);
};

const httpCreateLaunch = async (req, res) => {
  const launch = req.body;
  let { mission, rocket, launchDate, destination } = launch;
  if (!mission || !rocket || !launchDate || !destination)
    throw new BadRequestError(
      'mission, rocket, launchDate or destination missing'
    );

  launchDate = new Date(launchDate);
  if (launchDate.toString() === 'Invalid Date')
    throw new BadRequestError('Invalid lunch date');

  await scheduleNewLaunch(launch);
  console.log('launch :>> ', launch);
  return res.status(StatusCodes.CREATED).json(launch);
};

const httpDleteLaunch = async (req, res) => {
  const flightNumber = parseInt(req.params.flightNumber);
  const isLaunch = await isLaunchExist(flightNumber);
  if (!isLaunch) throw new NotFoundError('Launch not found');
  const launch = await abortLaunch(flightNumber);
  if (!launch) throw new BadRequestError('Invalid lunch date');
  return res.status(StatusCodes.OK).json(launch);
};

module.exports = { httpGetAllLaunches, httpCreateLaunch, httpDleteLaunch };
