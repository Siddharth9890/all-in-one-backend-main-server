const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  CountryName: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  IPV4: {
    type: String,
    unique: true,
  },
  UserAgent: {
    type: String,
  },
  Date: {
    type: Date,
    default: new Date().toISOString(),
  },
  LastVisited: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
