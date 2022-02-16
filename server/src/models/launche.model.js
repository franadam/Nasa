const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler X',
  rocket: 'Explorer IS1',
  launchDate: new Date('Decembre 27 2030'),
  destination: 'Kepler b',
  upcoming: true,
  success: true,
  customers: ['NASA', 'ZTM'],
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => Array.from(launches.values());

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

const abortLaunch = (flightNumber) => {
  const abortedLaunch = launches.get(parseInt(flightNumber));

  const abort = {
    ...abortedLaunch.launch,
    upcoming: false,
    success: false,
  };

  destroyLaunch(flightNumber);
  launches.set(flightNumber, abort);

  return abort;
};

const launchExist = (flightNumber) => {
  return launches.has(parseInt(flightNumber));
};

const destroyLaunch = (flightNumber) => {
  flightNumber = parseInt(flightNumber);
  const deletedLaunch = launches.get(flightNumber);
  launches.delete(flightNumber);
  return deletedLaunch;
};

module.exports = {
  launches,
  getAllLaunches,
  addLaunch,
  destroyLaunch,
  abortLaunch,
  launchExist,
};
