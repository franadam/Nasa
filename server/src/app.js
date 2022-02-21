require('express-async-errors');
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// router
const router = require('./routes/');

// middlewares
const errorHandlerMiddleware = require('./middlewares/error-handler.middleware');

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
app.use('/api/v1', router);

app.use(errorHandlerMiddleware);

module.exports = app;
