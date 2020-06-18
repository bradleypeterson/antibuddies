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
  //api.signup function
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
  * course/{course}: get course data
  * @param {Object} course course identifier, can be id or course name
  */
  app.get('/api/course/:course', (req, res) => {
    return respond(res, api.getCourse(req.params.course));
  });
  //api.getCourse function
  api.getCourse = (course) => {
    return new Promise((resolve, reject) => {
      if(course instanceof User){
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
  * quiz/{quiz}: get quiz data
  * @param {Object} course course identifier, can be id or course name
  * @param {Object} quiz quiz identifier, can be id or quiz name
  */
  app.get('/api/course/:course/quiz/:quiz', (req, res) => {
    return respond(res, api.getQuiz(req.params.course, req.params.quiz));
  });
  //api.getQuiz function
  api.getQuiz = (course, quiz) => {
    return new Promise(async (resolve, reject) => {
      if(quiz instanceof Quiz){
        //already a quiz object
        return resolve(quiz);
      }
      
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
  * @param {Object} course course identifier, can be id or course name
  * @param {Object} quiz quiz identifier, can be id or quiz name
  */
  app.get('/api/course/:course/quiz/:quiz/questions', (req, res) => {
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
  * quiz/addQuestion: add question to quiz
  * @param {Object} course course identifier, can be id or course name
  * @param {Object} quiz quiz identifier, can be id or quiz name
  */
  app.post('/api/course/:course/quiz/:quiz/addQuestion', (req, res) => {
    return respond(res, api.addQuizQuestion(req.params.course, req.params.quiz, req.body.question));
  });
  //api.addQuizQuestion function
  api.addQuizQuestion = (course, quiz, question) => {
    return new Promise(async (resolve, reject) => {
      //get course
      course = await api.getCourse(course);
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      //TODO: construct question, store in quiz
      return resolve(quiz.questions);
    });
  }
  

  //TODO: addCourse
  
  
  
  
  
  
  
  
  
  //checkAnswer(course, quiz, quesitonIndex, "cat")
  // questionIndex is from the user input (select)
  /* POST Check Answer
  * quiz/checkAnswer: Check the answer from the quiz
  * @param {Object} course course identifier, can be id or course name
  * @param {Object} quiz quiz identifier, can be id or quiz name
  */
  
  // POST /api/course/478126/quiz/217836/checkAnswer/, -body {questionIndex: 0, choice: "choice 1"}
  
  app.post('/api/course/:course/quiz/:quiz/checkAnswer/:questionIndex/:choice', (req, res) => {
    return respond(res, api.checkQuizAnswer(req.params.course, req.params.quiz, req.body.questionIndex, req.body.choice));
  });
  
  api.checkAnswer = (course, quiz, questionIndex, choice) => {
    return new Promise(async (resolve, reject) => {
      //get course
      course = await api.getCourse(course);
      //get quiz
      quiz = await api.getQuiz(course, quiz);
      //get question Index from the user select
      let question = quiz.questions[questionIndex];
      //questionIndex = getQuizQuestion(course, quiz, question)[questionIndex]
      
      //get choice (set as default index is 0)-- correct answer; object from the question[] = {..} => index = [0]
      //choice is the user ansswer; quiz.questions.answer[0] is the correct answer;
      if(choice === question.answer[0]){
        resolve(true);
      }
      else{
        resolve(false);
      }
      
    });
  }
  
  
  
  //TODO: Delete quiz
  
  
  
  
  //TODO: Delete question
  
  
  
  return api;
}
