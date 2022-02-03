const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  expiresIn: {
    type: String,
  },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
