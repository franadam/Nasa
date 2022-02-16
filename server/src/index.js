const http = require('http');

const app = require('./app');
const { loadPlanets } = require('./models/planet.model');

const port = process.env.PORT || 5000;

const server = http.createServer(app); //better for websocket

const start = async () => {
  await loadPlanets();
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

start();
