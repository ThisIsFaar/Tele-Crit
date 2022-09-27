const mongoose = require('mongoose');

const { Schema } = mongoose;

const tvShowSchema = new Schema({
  userId: String,
  title: String,
  streamingApp: String,
  rating: Number,
  publishMode: String,
  review: String,
});

module.exports = mongoose.model('tvShow', tvShowSchema);
