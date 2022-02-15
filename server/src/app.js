const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetRouter = require('./routes/planet.router');

const app = express();

// security package
app.use(
  cors({
    origin: 'http://localhost:3000/',
  })
);
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/api/v1/planets', planetRouter);

module.exports = app;
