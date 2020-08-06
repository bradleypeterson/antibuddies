const mongoose = require('mongoose');
let ObjectId = mongoose.ObjectId;

// Quiz Schema
let quiz = mongoose.Schema( {
    course_id  : { type: ObjectId, required: true },
    title      : { type: String,   required: true },
    questions  : [
      {
        question: { type: String, required: true },
        answers:  [ String ]
      }
    ]
});

module.exports = mongoose.model('quiz', quiz);



// Quiz schema example

/*

Notes:
  Choice 1 is always the correct answer
  Title is the unique identifier 
  
quizzes{
  //quiz#1
    quiz {
      "Course_id": "asdfasdfasdfasdf123",
      "title": "title name",
      "questions": [
        {
          "question": "pick the right answer"
          "answers": [
            "choice 1",
            "choice 2"
            "choice 3"
            "choice 4"
          ]
        },
        {
          "question": "pick the right answer"
          "answers": [
            "choice 1",
            "choice 2"
            "choice 3"
            "choice 4"
          ]
        },
        ...
      ]

    }

  //quiz#2
    quiz {
      "Course_id": "asdfasdfasdfasdf123",
      "title": "title name",
      "questions": [
        {
          "question": "pick the right answer"
          "answers": [
            "choice 1",
            "choice 2"
            "choice 3"
            "choice 4"
          ]
        },
        {
          "question": "pick the right answer"
          "answers": [
            "choice 1",
            "choice 2"
            "choice 3"
            "choice 4"
          ]
        },
        ...
      ]

    }
}

*/