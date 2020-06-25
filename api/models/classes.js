cconst mongoose = require('mongoose')
let ObjectId = mongoose.ObjectId;


let classesSchema = mongoose.Schema( {
    class_id    : ObjecId,
    user_id     : ObjectId,
    course_id   : ObjectId
});

// create the model
module.exports = mongoose.model('Classes', classesSchema);