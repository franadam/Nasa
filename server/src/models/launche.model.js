const launches = new Map();

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

module.exports = launches;
