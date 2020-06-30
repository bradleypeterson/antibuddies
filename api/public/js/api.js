/**
 * js/server.js
 * the client-sided api sdk/module. provides wrapper functions that call the existing api endpoints
 */

function request(url, method, body){
  if(typeof body !== 'string'){
    body = JSON.stringify(body);
  }
  return fetch(url, {
    method,
    headers: {
      'Accept'      : 'application/json, text/plain, */*', //to notify we want json (or text) data back as a response
      'Content-Type': 'application/json', //to specify the format of the extra data the client is sending, if anything
    },
    //mode: 'no-cors',
    body //data to send to server
  }).then(res => {
    if(res.ok){
      return res.json();
    } else {
      return res.json().then(v=>Promise.reject(v)).catch(v=>Promise.reject(v)); //promise rejection chaining to return a rejected promise.
    }
  });
}

//helper functions
function post(url, body){
  return request(url, 'POST', body);
}

function get(url){
  return request(url, 'GET');
}

function del(url){
  return request(url, 'DELETE');
}

var api = {};

api.post = post;
api.get = get;
api.del = del;

/*
 * ENDPOINTS
 * these should mirror those described in the server's api.js script
 */

api.getTest = (data) => {
  return get(`/api/test/${data}`); 
}

api.signup = (user) => {
  return post(`/api/signup`, user);
}

api.authenticate = (user) => {
  return post(`/api/authenticate`, user);
}

api.deauthenticate = () => {
  return get(`/api/deauthenticate`);
}

api.getUsers = () => {
  return get(`/api/users`);
}

api.getCourses = () => {
  return get(`/api/courses`);
}

api.addCourse = () => {
  return post(`/api/courses`);
}

api.getCourse = (course) => {
  return get(`/api/courses/${course}`);
}

api.getQuizzes = (course) => {
  return get(`/api/courses/${course}/quizzes`);
}

api.addQuiz = (course, quizData) => {
  return post(`/api/courses/${course}/quizzes`, quizData);
}

api.getQuiz = (course, quiz) => {
  return get(`/api/courses/${course}/quizzes/${quiz}`);
}

api.getQuizQuestions = (course, quiz) => {
  return (`/api/courses/${course}/quizzes/{quiz}/questions`);
}

api.getQuizQuestion = (course, quiz, questionIndex) => {
  return (`/api/courses/${course}/quizzes/${quiz}/questions/${questionIndex}`);
}


api.addQuizQuestion = (course, quiz, questionData) => {
  return (`/api/courses/:course/quizzes/:quiz/addQuestion`, questionData);
}

api.checkAnswer = (course, quiz, questionIndex, choice) => {
  return (`/api/courses/${course}/quizzes/${quiz}/questions/${questionIndex}/checkAnswer`, choice);
}

api.deleteQuiz = (course, quiz) => {
  return (`/api/course/${course}/quizzes/${quiz}`);
}

api.deleteQuestion = (course, quiz, questionIndex) => {
  return (`/api/courses/${course}/quizzes/${quiz}/questions/${questionIndex}`);
}