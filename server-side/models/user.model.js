// user.model.js
let mongoose = require("mongoose");

// Setup schema
let userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  email: String,
});

module.exports = mongoose.model("user", userSchema);
