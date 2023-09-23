const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
  code: String,
  country: String,
});

module.exports = mongoose.model('State', stateSchema);