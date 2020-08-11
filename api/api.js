const User = require('./models/user.js');
const Course = require('./models/course.js');
const Quiz = require('./models/quiz.js');
const Panel = require('./models/panel.js');
const panelResponse = require('./models/panelResponse.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const QuizResponse = require('./models/quizResponse.js');
const Lab = require('./models/lab.js');

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
  * @param {String} user.passwordT
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
  * /users: get list of users
  * @returns {Object} the list of users 
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
  * /users/:user: get a user from the user list
  * @param {String} user: user identifier, can be id or username
  * @returns {Object} the specific user by id or username
  
  */
  app.get('/api/users/:user', (req, res) => {
    return respond(res, api.getUser(req.params.user));
  });
  //get user function
  api.getUser = (user) => {
    return new Promise((resolve, reject) => {
      if(user instanceof User){
        //already a course object
        return resolve(user);
      } else if(mongoose.Types.ObjectId.isValid(user)){
        //get by objectId
        User.findById(user).exec(next);
      } else if(typeof user === 'string'){
        //get by username
        User.findOne({username: user}).exec(next);
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
  * /deleteUser/:user: delete a user from the user list
  * @param {String} user: user identifier, can be id or username
  * @returns {Object} the deleted a user per
  */
  app.delete('/api/deleteUser/:user', (req, res) => {
      return respond(res, api.deleteUser(req.params.user));
    });
  //delete a user
  api.deleteUser = (user) => {
    return new Promise(async (resolve, reject) => {
      try{
        user = await api.getUser(user);
        /*
        User.deleteOne({_id: user._id});
        //be identical
        return resolve(user);  
        */
        user.remove((err) => {
          if(err) {
            return reject(err);
          }
          return resolve(user);
        });
      }
      catch(err){
        reject(err);
      }
    });
  }
  
  
  
  
  /*
  * /courses: get list of courses
  * @returns {Object} the list of courses 
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
    return new Promise((resolve, reject) => {
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
  
  //OPTIONAL: DELETE a sepecific course: Priority: have permission with API key 
  /*
  * courses/:course:delete a sepecifc course
  * @param {String} course course identifier, can be id or course name
  * @returns {Object} the deleted course object
  */
  /*
  app.delete('/api/courses/:course', (req, res) => {
    return respond(res, api.deleteCourse(req.params.course));
  });
  
  api.deleteCourse = (course) => {
    return new Promise(async (reslove, reject) => {
    try {
       //get course 
       course = await api.getCourse(course);
      course.remove((err) => {
        if(err){
          return reject(err);
        }
          return resolve(course);
      });
     }
    catch(err)
      {
        reject(err);
      }
  });
  */
  
  
  /*
  * /users: get list of quizzes
  * @params {String} course course identifier, can be id or course name
  * @returns {Object} the list of quizzes under the specific course 
  */
  app.get('/api/courses/:course/quizzes', (req, res) => {
    return respond(res, api.getQuizzes(req.params.course));
  });
  api.getQuizzes = (course) => {
    return new Promise(async (resolve, reject) => {
      try {
        //get course
        course = await api.getCourse(course);

        Quiz.find({course_id: course._id}).exec((err, courses) => {
          if(err){
            return reject(err);
          }
          return resolve(courses);
        });
      } catch(err) {
        reject(err);
      }
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
      try {
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
      } catch(err) {
        reject(err);
      }
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
      try {
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
          Quiz.findOne({title: quiz, course_id: course._id}).exec(next);
        } else {
          return reject('Invalid id type');
        }
        function next(err, doc){
          if(err){
            return reject(err);
          }
          console.log(doc);
          if(!doc){
            return reject('No quiz found');
          }
          return resolve(doc);
        }
      } catch(err) {
        reject(err);
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
      try {
        //get course
        course = await api.getCourse(course);
        //get quiz
        quiz = await api.getQuiz(course, quiz);
        
        return resolve(quiz.questions);
      } catch(err) {
        reject(err);
      }
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
      try {
        //get course
        course = await api.getCourse(course);
        //get quiz
        quiz = await api.getQuiz(course, quiz);
        
        //Covert string to integer
        questionIndex = parseInt(questionIndex);
        
        if(isNaN(questionIndex)){
          return reject('invalid questionIndex');
        }
        
        return resolve(quiz.questions[questionIndex]);
      } catch(err) {
        reject(err);
      }
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
      try {
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
      } catch(err) {
        reject(err);
      }
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
      try {
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
  * @returns {Object} the deleted quiz object
  */
  app.delete('/api/courses/:course/quizzes/:quiz', async (req, res) => {
    return respond(res, api.deleteQuiz(req.params.course, req.params.quiz))
  });
  
  api.deleteQuiz = (course, quiz) => {
    return new Promise(async (resolve, reject) => {
      try {
        //get course
        course = await api.getCourse(course);

        //get quiz
        quiz = await api.getQuiz(course, quiz);

        //remove documents ()
        //quiz.remove();
        //Quiz.deleteOne({ _id: quiz._id });
        //also save;
        quiz.remove((err) => {
          if(err){
            return reject(err);
          }
          return resolve(quiz);
        });
      } catch(err) {
        reject(err);
      }
    });
  }
  
  
  
  
   /* DELETE question by specific index
  * quiz/questions/:questionIndex: Delete one question from the quiz which is up to the pass in index of question
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  * @param {String} questionIndex index of the question within the quiz
  * @returns {Object} the deleted question
  */
  app.delete('/api/courses/:course/quizzes/:quiz/questions/:questionIndex', async (req, res) => {
    return respond(res, api.deleteQuestion(req.params.course, req.params.quiz, req.params.questionIndex));
  });
  
  api.deleteQuestion = (course, quiz, questionIndex) => {
    return new Promise(async (resolve, reject) => {
      try {
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
        });
      } catch(err) {
        reject(err);
      }
    });
  }
  
  
  /* GET quiz/responses
  * courses/responses: keep track of students retaking a quiz multiple times
  * two queries need to be true, then refers to /quizResponse/?user_id=514nniun4143&quiz_id=234nlot42t2f
  * quiz would be queryString, no params.quiz pass in, but query.quiz instead.
  * quiz_id(from quizResponse.js) = quiz._id(from quiz.js)
  * user_id(from quizResponse.js) = user._id(from user.js)
  * @param {String} course course identifier, can be id or course name
  * @query {String} quiz quiz identifier, can be id or quiz name
  * @query {String} user user identifier, can be id or user name
  * @returns {Object} the get quizResponse objects
  */

  app.get('/api/courses/:course/quizResponses', (req, res) => {
    return respond(res, api.getQuizResponses(req.params.course, req.query.quiz, req.query.user));
  });
  
  api.getQuizResponses = (course, quiz, user) => {
    return new Promise(async (resolve, reject) => {
   
    try{
       //get course
      course = await api.getCourse(course);
      let quiz_id, user_id;
      //get quiz
      if(quiz){
        quiz_id = (await api.getQuiz(course, quiz))._id;
      }
      //get user information by id
      if(user){
        user_id = (await api.getUser(user))._id;
      }
      //get quiz Response
      QuizResponse.find({user_id: user_id, quiz_id: quiz_id}).exec((err, quizResponses) => {
        
      if(err){
        return reject(err);
      }
      return resolve(quizResponses);
      });      
    }
    catch(err){
      reject(err);
    }
    });
  }
  
  
   /* POST course/responses
  * courses/quizResponses: submit a quiz by student
  * @param {String} course course identifier, can be id or course name
  * @param {Object} body quiz data
  * @param {String} body.quiz_id id of the submitted quiz
  * @param {String} body.user_id id of the user taking the quiz
  * @param {Array<String>} body.answers array of chosen answers
  * @returns {Object} test the quizResponse and test the other two endpoints (GET course/quizResponses & GET quiz/question/:questionIndex/responses)
  */ 
  app.post("/api/courses/:course/quizResponses", (req, res) => {
    return respond(res, api.submitQuiz(req.params.course, req.body));
  });
  
  api.submitQuiz = (course, quizData) => {
    return new Promise(async (resolve, reject) => {
      try{
        if(!quizData.quiz_id || !quizData.user_id){
          return reject('Invalid question structure');
        }
        course = await api.getCourse(course);
        quizData.course_id = course._id;
        
        let quiz = await api.getQuiz(course, quizData.quiz_id);
        
        if(!quizData.answers || quiz.questions.length !== quizData.answers.length){
          return reject('Invalid answer set');
        }
        
        //store correct count
        let correct = 0;
        quizData.answers.forEach((answer, i) => {
          if(answer === quiz.questions[i].answers[0]){
            correct++;
          }
        });
        
        //POST: wait for client to send data to server
        let newQuizResponse = new QuizResponse(quizData);
        
        newQuizResponse.save((err, data) => {
          if(err){
            return reject(err);
          }
          return resolve(data);
        });
      }
      catch(err){
        reject(err);
      }
    });
  }
  
  
    
  /* GET course/quizResponse/count
  * courses/quizResponses: Counting the number of the objects from quizResponse() based on:
                      query string: user_id OR quiz_id OR (user_id & quiz_id)
  * @param {String} course course identifier, can be id or course name
  * @query {String} quiz quiz identifier, can be id or quiz name
  * @query {String} user user identifier, can be id or user name
  * @returns {Object} return the number of the objects which as same as the number of attempts by certain student
  */ 
  app.get('/api/courses/:course/quizResponses/count', (req, res) => {
    return respond(res, api.getQuizUserResponseCount(req.params.course, req.query.quiz, req.query.user));
  });
  
  api.getQuizUserResponseCount = (course, quiz, user) => {
    return new Promise(async (resolve, reject) => {
      try{
        // if(!quiz || !user){
        //   return reject('please supply a quiz and user');
        // }
        let responses = await api.getQuizResponses(course, quiz, user);
        return resolve(responses.length);
      }
      catch(err){
        reject(err);
      }
    });
  }
  
  
  /* GET quiz/question/:questionIndex/responses
  * courses/quizResponses: Keep track of how many times certain answers are chosen by students
                      Get from the "answers" string among all of the students
  * @param {String} course course identifier, can be id or course name
  * @param {String} quiz quiz identifier, can be id or quiz name
  * @param {String} questionIndex questionIndex identifier
  * @returns {Object} return the answers (string) selected among students
  */ 
  
  app.get('/api/courses/:course/quizzes/:quiz/questions/:questionIndex/responses', (req, res) => {
    return respond(res, api.getQuestionResponses(req.params.course, req.params.quiz, req.params.questionIndex));
  });
  
  api.getQuestionResponses = (course, quiz, questionIndex) => {
    return new Promise(async (resolve, reject) => {
      try {
        //get course
        course = await api.getCourse(course);
        //get quiz
        quiz = await api.getQuiz(course, quiz);
        //Covert string to integer (questionIndex)
        questionIndex = parseInt(questionIndex);
        if(isNaN(questionIndex)){
          return reject('invalid questionIndex');
        }
        let reference = quiz.questions[questionIndex].answers;

        //find the array: "answers[...]"
        QuizResponse.find({quiz_id: quiz._id}).exec((err, quizResponses) => {
          if(err){
            return reject(err);
          }
          //Set up an fixed array then could be stored in.
          let responseCounts = [0,0,0,0];
          quizResponses.forEach(response => {
            let answer = response.answers[questionIndex];
            let idx = reference.indexOf(answer);
            responseCounts[idx]++;
          });
          return resolve(responseCounts);
        });
      } catch(err){
        reject(err);
      }
    });
  }
  
  
  /* GET course/quizScores
  * get scores for quiz responses
  * @param {String} course course identifier, can be id or course name
  * @query {String} quiz quiz identifier, can be id or quiz name
  * @query {String} user user identifier, can be id or user name
  * @returns {Object} return the number of the objects which as same as the number of attempts by certain student
  */ 
  app.get('/api/courses/:course/quizScores', (req, res) => {
    return respond(res, api.getQuizScores(req.params.course, req.query.quiz, req.query.user));
  });
  
  api.getQuizScores = (course, quiz, user) => {
    return new Promise(async (resolve, reject) => {
      try{
        // if(!quiz || !user){
        //   return reject('please supply a quiz and user');
        // }
        let responses = await api.getQuizResponses(course, quiz, user);
        responses = responses.map(async res => {
          if(res.correct){
            return res.correct;
          } else {
            let correct = 0;
            let quiz = await api.getQuiz(res.course_id, res.quiz_id);
            res.answers.forEach((answer, i) => {
              if(answer === quiz.questions[i].answers[0]){
                correct++;
              }
            });
            return correct
          }
        });
        responses = await Promise.all(responses);
        return resolve(responses);
      }
      catch(err){
        reject(err);
      }
    });
  }
  
  
  /* GET panels/:panelName
   *  Grabs the panel with the a particular name
   * @param {String} name is the used passed-in string
   * @returns {Object} returns the panel corresponding to the user input
   */
  app.get('/api/courses/:course/panels/:panelName', (req, res) => {
    return respond(res, api.getPanelByName(req.params.panelName));
  });
  api.getPanelByName = (name) => {
    return new Promise(async (resolve, reject) => {
      try {
        Panel.findOne({ PanelName: name }).exec((err, panel) => {
          if(err) {
             return reject(err);
          }
          return resolve(panel);
        })
      } catch(err) {
        reject(err);
      }
    });
  }
  
  
  /* GET courses/:course/panels
   * Grabs the panels for the course
   * @param {String} course is the course that is being passed in
   * @returns {Object} returns the panels corresponding to the course id
   */
  app.get('/api/courses/:course/panels', (req, res) => {
    return respond(res, api.getPanels(req.params.course));
  });
  api.getPanels = (course) => {
    return new Promise(async (resolve, reject) => {
      try {
        // get course
        course = await api.getCourse(course);
        
        // Query for panels
        Panel.find({Course_id: course._id}).exec((err, panels) => {
          if(err) {
            return reject(err);
          }
          return resolve(panels);
        });
      } catch(err) {
        reject(err);
      }
    });
  }
  
  
  /*
   * POST panels: add panel
   * @param {Object} Course id
   * @param {Object} course data
   */
  app.post('/api/courses/:course/panels', (req, res) => {
    return respond(res, api.addPanel(req.params.course, req.body));
  });
  
  api.addPanel = (course, panelData) => {
    return new Promise(async (resolve, reject) => {
      // ADD PanelName Check, no dupicates
      try {
        course = await api.getCourse(course);
        if(!panelData.PanelName) {
          return reject('Invalid Panel Struture. Requires PanelName.');
        }
        panelData.course_id = course._id;
        let newPanel = new Panel(panelData);
        newPanel.save((err, saved) => {
          if(err) {
            return reject(err);
          }
          return resolve(saved);
        });
      } catch(err) {
        reject(err);
      }
    });
  }
  
  
  /* GET courses/:course/panels/:difficulty
   *  Grabs the difficulty for the panel
   * @param {String} Course is the course that is being passed in
   * @param {String} Difficulty of the panel that is being passed in
   * @returns {Object} returns the panels corresponding to the course id and difficulty
   */
  app.get('/api/courses/:course/panels/difficulty/:difficulty', (req, res) => {
    return respond(res, api.getPanelDifficulty(req.params.course, req.params.difficulty));
  });
  
  // filter by difficulty
  api.getPanelDifficulty = (course, difficulty) => {
    return new Promise(async (resolve, reject) => {
      try {
        course = await api.getCourse(course);
        Panel.find({Course_id: course._id, difficulty: difficulty}).exec((err, panels) => {
          if(err) {
            return reject(err);
          }
          return resolve(panels);
        })
      } catch(err) {
        reject(err);
      }
    });
  }
  
  /* GET courses/:course/panels/:panelName/score
   * Grabs the scores for the panel
   * @param {String} Course id
   * @param {String} Panel id
   * @returns {object} returns the panel scores corresponding to the course and panel id
   */
  app.get('/api/courses/:course/panels/:panelName/score', (req, res) => {
    console.log("panelName")
    return respond(res, api.panelScore(req.params.course, req.params.panelName));
  });
  
  api.panelScore = (course, panelName) => {
    return new Promise(async (resolve, reject) => {
      try {
        course = await api.getCourse(course);
        panelResponse.find({panelName: panelName}).exec((err, panels) => {
          if(err) {
            return reject(err);
          }
          return resolve(panels);
        });
        
      } catch(err) {
        reject(err);
      }
    });
  }
  
  /* POST courses/:course/panels/:panelName/score
   * POST scores for a panel
   * @param {String} Course id
   * @param {Object} html body
   * @returns {object} returns the panel scores corresponding to the course and panel id
   */
  app.post('/api/courses/:course/panels/:panelName/score', (req, res) => {
    return respond(res, api.postPanelScore(req.params.course, req.body));
  });
  
  api.postPanelScore = (course, scoreData) => {
    return new Promise(async (resolve, reject) => {
      try {
        course = await api.getCourse(course);
        if(!scoreData.PanelName) {
          return reject('Invalid Panel Struture. Requires PanelName.');
        }
        scoreData.course_id = course._id;
        let newScore = new panelResponse(scoreData);
        newScore.save((err, saved) => {
          if(err) {
            return reject(err);
          }
          return resolve(saved);
        });
      } catch(err) {
        reject(err);
      }
    });
  }
  
  
  
  
  /* GET /labs
   * Gets a list of all Labs
   * @returns {Array<Lab>} the array of labs
   */
  app.get('/api/labs', (req, res) => {
    return respond(res, api.getLabs());
  });
  api.getLabs = () => {
    return new Promise((resolve, reject) => {
      Lab.find({}).exec((err, labs) => {
        if(err){
          return reject(err);
        }
        return resolve(labs);
      });
    });
  }
  
  /* POST /labs
   * Gets a list of all Labs
   * @returns {Array<Lab>} the array of labs
   */
  app.post('/api/labs', (req, res) => {
    return respond(res, api.putLab(req.body));
  });
  api.putLab = (labData) => {
    return new Promise((resolve, reject) => {
      if(!labData || !labData.labID || !labData.name || !labData.description) {
        return reject('Invalid Lab struture. Requires labID, name, and description');
      }
      
      let newLab = new Lab(labData);
      
      newLab.save((err, savedLab) => {
        if(err){
          return reject(err);
        }
        return resolve(savedLab);
      });
    });
  }
  
  /*
  * GET /labs/:lab get a specific lab by id, labID, or name
  * @param {String} lab: lab identifier, can be id, labID, or name
  * @returns {Object} the specific lab
  */
  app.get('/api/labs/:lab', (req, res) => {
    return respond(res, api.getLab(req.params.lab));
  });
  api.getLab = (lab) => {
    return new Promise((resolve, reject) => {
      if(lab instanceof Lab){
        //already a course object
        return resolve(lab);
      } else if(mongoose.Types.ObjectId.isValid(lab)){
        //get by objectId
        Lab.findById(lab).exec(next);
      } else if(parseInt(lab)){
        //get by labID
        Lab.findOne({labID: lab}).exec(next);
      } else if(typeof lab === 'string'){
        //get by name
        Lab.findOne({name: lab}).exec(next);
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

  
  return api;
}








/*@*

Test Endpoint: https://antibuddies-api.glitch.me/api

*@*/