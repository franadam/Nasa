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

const addLaunche = (launch) => {
  latestFlightNumber++;

  const newLaunche = {
    ...launch,
    flightNumber: latestFlightNumber,
    upcoming: true,
    success: true,
    customers: ['NASA', 'MMI'],
  };

  launches.set(latestFlightNumber, {
    launch: newLaunche,
  });

  return newLaunche;
};

const destroyLaunche = (flightNumber) => {
  const deletedLaunche = launches.get(parseInt(flightNumber));
  launches.delete(flightNumber);
  return deletedLaunche;
};

module.exports = { launches, getAllLaunches, addLaunche, destroyLaunche };
