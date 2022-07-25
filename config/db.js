const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
require('dotenv').config();

const connectDB = async () => {
  //   console.log(process.env.DB_AUTH);
  try {
    await mongoose.connect(process.env.DB_AUTH, {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
