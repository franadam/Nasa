const express = require('express');
const cors = require('cors');

const planetRouter = require('./routes/planet.router');

const app = express();

// extra package
app.use(
  cors({
    origin: 'http://localhost:3000/',
  })
);
app.use(express.json());

// routes
app.use('/api/v1/planets', planetRouter);

module.exports = app;
