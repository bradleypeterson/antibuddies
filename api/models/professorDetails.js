const mongoose = require("mongoose");

// Professor details
let professor = mongoose.Schema({
  ProfessorName: { type: String, required: true },
  Professor_ID:  { type: String, required: true },
  Courses: [ String ]
});

module.exports = mongoose.model('professor', professor);