const mongoose = require("mongoose");
let ObjectId = mongoose.ObjectId;

let quizResponse = mongoose.Schema(
{
  course_id  : { type: ObjectId, required: true },
  quiz_id : {type: ObjectId, required: true},
  user_id : {type: ObjectId, required: true},      //get information from the specifc user.
  answers: [ String ],
  correct: Number
});

// create the model
module.exports = mongoose.model("quizResponse", quizResponse);

/*

//Each quizResponses represent one attempt;
results {
  "Student_id"/user_id: "W00000001",
  "Quiz_id": "quiz1",
  "answers": ["yellow", ]
}


*/