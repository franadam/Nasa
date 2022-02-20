const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const Planet = require('./planet.mongodb.model');

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

const loadPlanets = () =>
  new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '../../data/kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', async () => {
        const planetsFound = (await getAllPlanets()).length;
        console.log(`${planetsFound} habitable planets found!`);
        resolve();
      });
  });

const getAllPlanets = async () => {
  return await Planet.find();
};

const savePlanet = async (planet) => {
  //upsert create + update
  // create if doesn't exist or update otherwise
  try {
    await Planet.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (error) {
    console.error(`could not save the planet ${error}`);
  }
};

module.exports = { getAllPlanets, loadPlanets, savePlanet };
