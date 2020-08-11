const mongoose = require("mongoose");
let ObjectId = mongoose.ObjectId;

// Courses
let lab = mongoose.Schema({
  labID            : Number,
  nodes            : [{
    name           : String,
    nodeID         : Number,
    outGoingNodes  : [Number]
  }],
  description      : String,
  name             : String
});

// create the model
module.exports = mongoose.model("Lab", lab);
