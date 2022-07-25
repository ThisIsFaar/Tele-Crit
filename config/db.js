const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const db = process.env.DB_AUTH;
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
