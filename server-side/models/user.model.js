// user.model.js
const mongoose = require('mongoose');

// Setup schema
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: String,
});

module.exports = mongoose.model('user', userSchema);
