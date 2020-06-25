const mongoose = require('mongoose');
let ObjectId = mongoose.ObjectId;

// Practice Questions
let practionQuestionsSchema = mongoose.Schema( {
    question_id     : ObjectId,
    citem_id        : ObjectId,
    section         : String,
    question        : String,
    qdifficulty     : Number,
    atype           : Number,
    aresponse       : String
});

// create the model
module.exports = mongoose.model('PracticeQuestions', practionQuestionsSchema);

// Practice Questions Answers
let practionQuestionsAnswersSchema = mongoose.Schema( {
    qAnswer_id      : ObjectId,
    question_id     : ObjectId,
    answer          : String,
    anum            : Number
});

// create the model
module.exports = mongoose.model('PracticeQuestionsAnswers', practionQuestionsAnswersSchema);

// Practice Questions scores
let practionQuestionsScoresSchema = mongoose.Schema( {
    qScore_id       : ObjectId,
    question_id     : ObjectId,
    user_id         : ObjectId,
    correct         : Boolean,
    completed       : Boolean
});

// create the model
module.exports = mongoose.model('PractionQuestionsScores', practionQuestionsScoresSchema);




// Quiz Table

/*

PK: title

Quiz {
  "title": "whatever",
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
  ],
  
  "Course_id": "asdfasdfasdfasdf123"
}


*/