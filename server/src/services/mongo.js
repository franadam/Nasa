const mongoose = require('mongoose');

const connectDB = async (url) =>
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const mongooseLogs = () => {
  mongoose.connection.once('open', () => console.log('mongoose connected'));
  mongoose.connection.on('error', (err) => console.error(err));
};

const disconnectDB = async () => await mongoose.disconnect();

module.exports = { connectDB, disconnectDB, mongooseLogs };
