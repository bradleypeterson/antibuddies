const mongoose = require("mongoose");
let ObjectId = mongoose.ObjectId;

// Courses
let course = mongoose.Schema({
  courseName: { type: String, required: true }
});

// create the model
module.exports = mongoose.model("Course", course);
