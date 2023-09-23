const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  state_code: String,
  country_code: String,
});

module.exports = mongoose.model('City', citySchema);