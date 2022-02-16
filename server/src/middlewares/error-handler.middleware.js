const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  console.log('errorHandler');
  const error = {
    message: err.message || 'Something went wrong try again later',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res.status(error.statusCode).json({ message: error.message });
};

module.exports = errorHandler;
