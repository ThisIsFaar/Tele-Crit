const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model('User', userSchema);
