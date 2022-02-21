const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const {
  getAllLaunches,
  isLaunchExist,
  abortLaunch,
  scheduleNewLaunch,
} = require('../models/launch.model');
const getPagination = require('../services/pagination');

const httpGetAllLaunches = async (req, res) => {
  const { query } = req;

  const { limit, skip } = getPagination(query);
  const sortBy = query.sortBy ? query.sortBy : 'flightNumber';
  const order = query.order ? query.order : 'asc';

  const response = getAllLaunches()
    .limit(limit)
    .sort({ [sortBy]: order })
    .skip(skip);

  const launches = await response;

  return res.status(StatusCodes.OK).json({ launches, count: launches.length });
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
