const http = require('http');
require('dotenv').config();

const app = require('./app');
const { connectDB, mongooseLogs } = require('./services/mongo');
const { loadPlanets } = require('./models/planet.model');

const port = process.env.PORT || 5000;

const server = http.createServer(app); //better for websocket

const start = async () => {
  await connectDB(process.env.MONGOOSE_URI);
  await loadPlanets();
  mongooseLogs();
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

start();
