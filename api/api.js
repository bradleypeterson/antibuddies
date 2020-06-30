const User = require('./models/user.js');
const Course = require('./models/course.js');
const Quiz = require('./models/quiz.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//Exporting functions and values individually
module.exports = app => {
  
  let api = {};
  
  //helper functions
  function respond(res, promise){
    promise.then(data => {
      if(data === undefined) data = {}
      res.set('content-type', 'application/json');
      res.json(data); //send json back to client
    }).catch(err => {
      console.error(err);
      res.set('content-type', 'application/json');
      res.status(400).send(JSON.stringify({error: err.toString()})); //return json error
    });
  }

  function deny(res, info){
    res.set('content-type', 'application/json');
    res.status(400).send(JSON.stringify(info)); //return json error
  }
  
  
  
  /**
  * test endpoint. returns the param in reverse
  * @param {String} data
  */
  app.get('/api/test/:data', (req, res) => {
    console.log(req.user)
    return respond(res, api.getTest(req.params.data));
    /*
    if(req.user && req.user.isAdmin){
    } else {
      return deny(res, 'not logged in');
    }
    */
  });
  
  api.getTest = (data) => {
    let result = data.split('').reverse().join('');
    return Promise.resolve(result);
  }
  
  /*
  * signup: registers a new user with given credentials
  * @param {Object} user
  * @param {String} user.username
  * @param {String} user.firstName
  * @param {String} user.lastName
  * @param {String} user.password
  * @param {Boolean} user.isAdmin
  */
  app.post('/api/signup', (req, res) => {
    return respond(res, api.signup(req.body));
  });
  //api.signup function - Add (Create) User
  api.signup = (user) => {
    return new Promise((resolve, reject) => {
      console.log(user);
      if (!user.username || !user.firstName || !user.lastName || !user.password){
        return reject('One or more of the fields is empty');
      }
      
      //check for existing user
      User.findOne({username: user.username}).exec((err, doc) => {
        if(err){
          return reject(err);
        }
        if(doc){
          return reject("user with that username already exists");
        }
        
        //create user
        let newUser = new User(user);
        
        //encrypt password
        newUser.password = newUser.generateHash(newUser.password);
        
        //save to database
        newUser.save((err, savedUser) => {
          if(err){
            return reject(err);
          }
          return resolve(savedUser);
        });
      });
    });
  }
  
  
  //TODO: Delete User
  /*
    api.get('/deleteUser') function (req, res){
    
    }
  */
  
  /*
  * authenticate: returns true if credentials are correct
  * @param {Object} user
  * @param {String} user.username
  * @param {String} user.password
  */
  app.post('/api/authenticate', (req, res) => {
    return respond(res, api.authenticate(res, req.body));
  });
  //api.authenticate function
  api.authenticate = (res, user) => {
    return new Promise((resolve, reject) => {
      if (!user.username || !user.password){
        return reject('Username or Password empty. Please try again');
      }
      
      User.findOne({username: user.username}).exec((err, dbUser) => {
        if(err){
          return reject(err);
        }
        if(dbUser){
          console.log(dbUser.checkPassword(user.password));
          if(dbUser.checkPassword(user.password)){
            //sing jwt token and send to client
            let token = jwt.sign({user_id: dbUser._id}, process.env.SECRET, { expiresIn: '5h' });
            console.log("token",token); // print out the token
            res.cookie('token', token);
            return resolve({token, user: dbUser});
          } else {
            return resolve(false); //incorrect password
          }
        } else {
          return resolve(false); //no user found
        }
      });
    });
  }
  
  /*
  * deauthenticate: invalidates the user session (JWT) token
  */
  app.get('/api/deauthenticate', (req, res) => {
    return respond(res, api.deauthenticate(req, res));
  });
  //api.deauthenticate function
  api.deauthenticate = (req, res) => {
    return new Promise((resolve, reject) => {
      res.cookie('token', '');
      return resolve(true);
    });
  }
  
  /*
  * users: get list of users
  */
  app.get('/api/users', (req, res) => {
    return respond(res, api.getUsers());
  });
  api.getUsers = () => {
    return new Promise((resolve, reject) => {
      User.find({}).exec((err, users) => {
        if(err){
          return reject(err);
        }
        return resolve(users);
      });
    });
  }
  
  /*
  * courses: get list of courses
  */
  app.get('/api/courses', (req, res) => {
    return respond(res, api.getCourses());
  });
  api.getCourses = () => {
    return new Promise((resolve, reject) => {
      Course.find({}).exec((err, courses) => {
        if(err){
          return reject(err);
        }
        return resolve(courses);
      });
    });
  }
  
  /*
  * POST courses: add course
  * @param {Object} body course data
  * @param {String} body.courseName name of the course
  */
  /*
    courseName    : { type: String,   required: true}
  */
  
  app.post('/api/courses', (req, res) => {
    return respond(res, api.addCourse(req.body));
  });
  api.addCourse = (courseData) => {
    return new Promise(async (resolve, reject) => {
      if(!courseData.courseName){
        return reject('Invalid course structure');
      }
      //create and save course
      let newCourse = new Course(courseData);
      newCourse.save((err, savedCourse) => {
        if(err){
          return reject(err);
        }
        return resolve(savedCourse);
      });
    });
  }
  
  /*
  * courses/{course}: get course data
  * @param {String} course course identifier, can be id or course name
  */
  app.get('/api/courses/:course', (req, res) => {
    return respond(res, api.getCourse(req.params.course));
  });
  //api.getCourse function
  api.getCourse = (course) => {
    return new Promise((resolve, reject) => {
      if(course instanceof Course){
        //already a course object
        return resolve(course);
      } else if(mongoose.Types.ObjectId.isValid(course)){
        //get by objectId
        Course.findById(course).exec(next);
      } else if(typeof course === 'string'){
        //get by name
        Course.findOne({courseName: course}).exec(next);
      } else {
        return reject('Invalid id type');
      }
      function next(err, doc){
        if(err){
          return reject(err);
        }
        return resolve(doc);
      }
    });
  }
  
  /*
  * quizzes: get list of quizzes
  */
  app.get('/api/courses/:course/quizzes', (req, res) => {
    return respond(res, api.getQuizzes(req.params.course));
  });
  api.getQuizzes = (course) => {
    return new Promise(async (resolve, reject) => {
      
      //get course
      course = await api.getCourse(course);
      
      Quiz.find({course_id: course._id}).exec((err, courses) => {
        if(err){
          return reject(err);
        }
        return resolve(courses);
      });
    });
  }
  
  /*
  * POST quizzes: add quiz to course
  * @param {Object} body quiz data
  * @param {String} body.title quiz title
  * @param {Array<Question>} body.questions quiz questions
  * @param {String} body.questions.question question text
  * @param {Array<String>} body.questions.answers list of possible choices, the first item will be marked as the correct answer
  */
  /*
    title      : { type: String,   required: true },
    questions  : [
      {
        question: { type: String, required: true },
        answers:  [ String ]
      }
    ]
  */
  
  app.post('/api/courses/:course/quizzes', (req, res) => {
    return respond(res, api.addQuiz(req.params.course, req.body));
  });
  api.addQuiz = (course, quizData) => {
    return new Promise(async (resolve, reject) => {
      //get course
      course = await api.getCourse(course);
      //create quiz
      if(!quizData.title){
        return reject('Invalid quiz structure');
      }
      quizData.course_id = course._id;
      let newQuiz = new Quiz(quizData);
      newQuiz.save((err, savedQuiz) => {
        if(err){
          return reject(err);
        }
        return resolve(savedQuiz);
      });
    });
  }
  
  /*
  * quizzes/{quiz}: get quiz data
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  */
  app.get('/api/courses/:course/quizzes/:quiz', (req, res) => {
    return respond(res, api.getQuiz(req.params.course, req.params.quiz));
  });
  //api.getQuiz function
  api.getQuiz = (course, quiz) => {
    return new Promise(async (resolve, reject) => {
      if(quiz instanceof Quiz){
        //already a quiz object
        return resolve(quiz);
      }
      console.log({course, quiz});
      //get course
      course = await api.getCourse(course);
      
      if(mongoose.Types.ObjectId.isValid(quiz)){
        //get by objectId
        Quiz.findById(quiz).exec(next);
      } else if(typeof quiz === 'string'){
        //get by name
        Quiz.findOne({quizName: quiz, course_id: course._id}).exec(next);
      } else {
        return reject('Invalid id type');
      }
      function next(err, doc){
        if(err){
          return reject(err);
        }
        return resolve(doc);
      }
    });
  }
  
  /*
  * quiz/questions: get quiz questions
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  */
  app.get('/api/courses/:course/quizzes/:quiz/questions', (req, res) => {
    return respond(res, api.getQuizQuestions(req.params.course, req.params.quiz));
  });
  //api.getQuizQuestion function
  api.getQuizQuestions = (course, quiz) => {
    return new Promise(async (resolve, reject) => {
      //get course
      course = await api.getCourse(course);
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      
      return resolve(quiz.questions);
    });
  }
  
  /*
  * quiz/questions/{question}: get quiz question
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  */
  app.get('/api/courses/:course/quizzes/:quiz/questions/:questionIndex', (req, res) => {
    return respond(res, api.getQuizQuestion(req.params.course, req.params.quiz, req.params.questionIndex));
  });
  api.getQuizQuestion = (course, quiz, questionIndex) => {
    return new Promise(async (resolve, reject) => {
      //get course
      course = await api.getCourse(course);
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      
      questionIndex = parseInt(questionIndex);
      
      if(isNaN(questionIndex)){
        return reject('invalid questionIndex');
      }
      
      return resolve(quiz.questions[questionIndex]);
    });
  }
  
  
  /*
  * quiz/addQuizQuestion: add question to quiz
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  * @param {Object} body question data
  * @param {String} body.question the question text
  * @param {Array<String>} body.answers possible choices. the first item will be marked as the correct answer
  */
  app.post('/api/courses/:course/quizzes/:quiz/addQuestion', (req, res) => {
    return respond(res, api.addQuizQuestion(req.params.course, req.params.quiz, req.body));
  });
  //api.addQuizQuestion function
  api.addQuizQuestion = (course, quiz, questionData) => {
    return new Promise(async (resolve, reject) => {
      //get course
      course = await api.getCourse(course);
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      
      if(!questionData.question){
        return reject('Invalid question structure');
      }
      //add question and save
      quiz.questions.push(questionData);
      quiz.save((err, savedQuiz) => {
        if(err){
          return reject(err);
        }
        return resolve(questionData);
      });
    });
  }
  

  
  //checkAnswer(course, quiz, quesitonIndex, "cat")
  // questionIndex is from the user input (select)
  /* POST Check Answer
  * quiz/checkAnswer: Check the answer from the quiz
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  * @param {String} questionIndex index of the question within the quiz
  * @param {Object} body choice data
  * @param {String} body.choice the string of the chosen answer
  */
  
  // POST /api/course/478126/quiz/217836/checkAnswer/, -body {choice: "choice 1"}
  
  app.post('/api/courses/:course/quizzes/:quiz/questions/:questionIndex/checkAnswer', (req, res) => {
    return respond(res, api.checkQuizAnswer(req.params.course, req.params.quiz, req.params.questionIndex, req.body.choice));
  });
  //api.checkAnswer function
  api.checkQuizAnswer = (course, quiz, questionIndex, choice) => {
    return new Promise(async (resolve, reject) => {
      try{
      //get course
      course = await api.getCourse(course);
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      //Convert
      questionIndex = parseInt(questionIndex);
      
      if(isNaN(questionIndex)){
        return reject('invalid questionIndex');
      }
      //get question Index from the user select
      let question = quiz.questions[questionIndex];
      //questionIndex = getQuizQuestion(course, quiz, question)[questionIndex]
      
      //get choice (set as default index is 0)-- correct answer; object from the question[] = {..} => index = [0]
      //choice is the user answer; quiz.questions.answer[0] is the correct answer;
      if(choice === question.answers[0]){
        resolve(true);
      }
      else{
        resolve(false);
      }
      } catch(err) {
        reject(err);
      }
    });
  }
  
  
  
  /*Delete quiz  - remove a doucement "quiz{}"
   * quiz/questions/:quiz: Delete a quiz (document type) from the quizzes
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  */
  app.delete('/api/courses/:course/quizzes/:quiz', async (req, res) => {
    return respond(res, api.deleteQuiz(req.params.course, req.params.quiz))
  });
  
  api.deleteQuiz = (course, quiz) => {
    return new Promise(async (resolve, reject) => {
      
      //get course
      course = await api.getCourse(course);
      
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      
      //remove documents ()
      //quiz.remove();
      //Quiz.deleteOne({ _id: quiz._id });
      //also save;
      console.log('deleting')
      quiz.remove((err) => {
        if(err){
          return reject(err);
        }
        return resolve(quiz);
      })
    });
  }
  
  
  
  
   /* DELETE question by specific index
  * quiz/questions/:questionIndex: Delete one question from the quiz which is up to the pass in index of question
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  * @param {String} questionIndex index of the question within the quiz
  */
  app.delete('/api/courses/:course/quizzes/:quiz/questions/:questionIndex', async (req, res) => {
    return respond(res, api.deleteQuestion(req.params.course, req.params.quiz, req.params.questionIndex));
  });
  
  api.deleteQuestion = (course, quiz, questionIndex) => {
    return new Promise(async (resolve, reject) => {
      
      //get course
      course = await api.getCourse(course);
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      //Convert
      questionIndex = parseInt(questionIndex);
      
      if(isNaN(questionIndex)){
        return reject("Invalid questionIndex!"); 
      }
      
      //remove the speific item from an array - use splice()
      let deletedQuestion = quiz.questions.splice(questionIndex, 1)[0];
      
      //Save
      quiz.save((err, savedQuiz) => {
        if(err){
          return reject(err);
        }
        return resolve(deletedQuestion);
      })
    });
  }
  
  
  
  
  
  
  

  //Return to the Server.js??
  return api;
}



/*@*

Test Endpoint: https://antibuddies-api.glitch.me/api

*@*/