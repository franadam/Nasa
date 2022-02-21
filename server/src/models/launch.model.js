const axios = require('axios');
const { BadRequestError } = require('../errors');
const Launch = require('./launch.mongodb.model');
const Planet = require('./planet.mongodb.model');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

/* const launch = {
  flightNumber: 100,
  mission: 'Kepler X',
  rocket: 'Explorer IS1',
  launchDate: new Date('Decembre 27 2030'),
  destination: 'Kepler-62 f',
  upcoming: true,
  success: true,
  customers: ['NASA', 'ZTM'],
}; */

//launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  try {
    return Launch.find({}, { _id: 0, __v: 0 });
  } catch (error) {
    console.error(error);
  }
};

const scheduleNewLaunch = async (launch) => {
  const planet = await Planet.findOne({ keplerName: launch.destination });
  if (!planet) throw new BadRequestError('No Planet found');

  const flightNumber = (await getLatestLaunchNumber()) + 1;

  const newLaunch = {
    ...launch,
    flightNumber,
    upcoming: true,
    success: true,
    customers: ['NASA', 'MMI'],
  };

  await saveLaunch(newLaunch);
};

const addLaunch = (launch) => {
  latestFlightNumber++;

  const newLaunch = {
    ...launch,
    flightNumber: latestFlightNumber,
    upcoming: true,
    success: true,
    customers: ['NASA', 'MMI'],
  };

  launches.set(latestFlightNumber, {
    launch: newLaunch,
  });

  return newLaunch;
};

const saveLaunch = async (launch) => {
  await Launch.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
    new: true,
  });
};

const getLatestLaunchNumber = async () => {
  const latest = await Launch.findOne().sort('-flightNumber'); // sort launches by fn and return the firs one
  if (!latest) return DEFAULT_FLIGHT_NUMBER;
  return latest.flightNumber;
};

const abortLaunch = async (flightNumber) => {
  const abortedLaunch = await Launch.findOneAndUpdate(
    {
      flightNumber,
    },
    {
      upcoming: false,
      success: false,
    },
    { new: true }
  );

  //destroyLaunch(flightNumber);
  console.log('flightNumber:>> ', flightNumber);
  return abortedLaunch;
};

const findLaunch = async (filter) => {
  return await Launch.findOne(filter);
};

const isLaunchExist = async (flightNumber) => {
  return await findLaunch({ flightNumber });
};

const destroyLaunch = (flightNumber) => {
  flightNumber = parseInt(flightNumber);
  const deletedLaunch = launches.get(flightNumber);
  launches.delete(flightNumber);
  return deletedLaunch;
};

const populateSpaceXLaunches = async () => {
  try {
    const response = await axios.get(process.env.SPACEX_API_URI);
    const launchDocs = response.data;
    for (let launchDoc of launchDocs) {
      const payloads = launchDoc.rocket.second_stage.payloads;
      const customers = payloads.map((payload) => payload.customers);

      const spaceXLaunch = {
        flightNumber: launchDoc.flight_number,
        mission: launchDoc.mission_name,
        rocket: launchDoc.rocket.rocket_name,
        launchDate: launchDoc.launch_date_local,
        upcoming: launchDoc.upcoming,
        success: launchDoc.launch_success,
        customers: customers.flat(),
      };
      await saveLaunch(spaceXLaunch);
    }
  } catch (error) {
    console.error(error);
  }
};

const loadLaunches = async () => {
  const launch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (launch) return;
  else {
    await populateSpaceXLaunches();
  }
};

//saveLaunch(launch);

module.exports = {
  launches,
  getAllLaunches,
  destroyLaunch,
  abortLaunch,
  isLaunchExist,
  scheduleNewLaunch,
  loadLaunches,
};
