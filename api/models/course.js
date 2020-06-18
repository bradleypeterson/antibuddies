const mongoose = require('mongoose');
let ObjectId = mongoose.ObjectId;

// Courses
let course = mongoose.Schema( {
    // course_id     : { type: ObjectId, required: true},
    courseName    : { type: String,   required: true},
    professor_id  : { type: ObjectId, required: true}
});

// create the model
module.exports = mongoose.model('Course', course);
