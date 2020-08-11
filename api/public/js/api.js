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
      return res.text().then(v=>Promise.reject(v)).catch(v=>{
        res.textPromise.reject(v)
      }); //promise rejection chaining to return a rejected promise.
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

const BASE_URL = 'https://antibuddies-api.glitch.me/api';

api.getTest = (data) => {
  return get(`${BASE_URL}/test/${data}`); 
}

api.signup = (user) => {
  return post(`${BASE_URL}/signup`, user);
}

api.authenticate = (user) => {
  return post(`${BASE_URL}/authenticate`, user);
}

api.deauthenticate = () => {
  return get(`${BASE_URL}/deauthenticate`);
}

api.getUsers = () => {
  return get(`${BASE_URL}/users`);
}

api.getUser = (user) => {
  return get(`${BASE_URL}/users/${user}`);
}

api.deleteUser = (user) => {
  return del(`${BASE_URL}/users/${user}`);
}

api.getCourses = () => {
  return get(`${BASE_URL}/courses`);
}

api.addCourse = (course) => {
  return post(`${BASE_URL}/courses`, course);
}

api.getCourse = (course) => {
  return get(`${BASE_URL}/courses/${course}`);
}

api.getQuizzes = (course) => {
  return get(`${BASE_URL}/courses/${course}/quizzes`);
}

api.addQuiz = (course, quizData) => {
  return post(`${BASE_URL}/courses/${course}/quizzes`, quizData);
}

api.getQuiz = (course, quiz) => {
  return get(`${BASE_URL}/courses/${course}/quizzes/${quiz}`);
}

api.getQuizQuestions = (course, quiz) => {
  return get(`${BASE_URL}/courses/${course}/quizzes/${quiz}/questions`);
}

api.getQuizQuestion = (course, quiz, questionIndex) => {
  return get(`${BASE_URL}/courses/${course}/quizzes/${quiz}/questions/${questionIndex}`);
}

api.getQuizScores = (course, data) => {
  
  let query = "";
  if(data.quiz && data.user){
    query = `?quiz=${data.quiz}&user=${data.user}`;
  } else if(data.quiz){
    query = `?quiz=${data.quiz}`;
  } else if(data.user){
    query = `?user=${data.user}`;
  }
  
  return get(`${BASE_URL}/courses/${course}/quizScores${query}`);
}

api.addQuizQuestion = (course, quiz, questionData) => {
  return post(`${BASE_URL}/courses/${course}/quizzes/${quiz}/addQuestion`, questionData);
}

api.checkAnswer = (course, quiz, questionIndex, choice) => {
  return post(`${BASE_URL}/courses/${course}/quizzes/${quiz}/questions/${questionIndex}/checkAnswer`, choice);
}

api.deleteQuiz = (course, quiz) => {
  return del(`${BASE_URL}/course/${course}/quizzes/${quiz}`);
}

api.deleteQuestion = (course, quiz, questionIndex) => {
  return del(`${BASE_URL}/courses/${course}/quizzes/${quiz}/questions/${questionIndex}`);
}

api.getPanels = (course) => {
  return get(`${BASE_URL}/courses/${course}/panels`);
}

api.getPanelByName = (course, panelName) => {
  return get(`${BASE_URL}/courses/${course}/panels/${panelName}`);
}

api.addPanel = (course, panelData) => {
  return post(`${BASE_URL}/courses/${course}/panels`, panelData);
};

api.postPanelScore = (course, panelName, scoreData) => {
  return post(`${BASE_URL}/courses/${course}/panels/${panelName}/score`, scoreData);
};

api.panelScore = (course, panelName) => {
  return get(`${BASE_URL}/courses/${course}/panels/${panelName}/score`);
};

api.getPanelDifficulty = (course, difficulty) => {
  return get(`${BASE_URL}/courses/${course}/panels/difficulty/${difficulty}`);
};

api.getQuizResponses = (course, data) => {
  
  let query = "";
  if(data.quiz && data.user){
    query = `?quiz=${data.quiz}&user=${data.user}`;
  } else if(data.quiz){
    query = `?quiz=${data.quiz}`;
  } else if(data.user){
    query = `?user=${data.user}`;
  }
  return get(`${BASE_URL}/courses/${course}/quizResponses${query}`);
}

api.submitQuiz = (course, quizData) => {
  return post(`${BASE_URL}/courses/${course}/quizResponses`, quizData);
}

api.getQuizUserResponseCount = (course, data) => {
  
  let query = "";
  if(data.quiz && data.user){
    query = `?quiz=${data.quiz}&user=${data.user}`;
  } else if(data.quiz){
    query = `?quiz=${data.quiz}`;
  } else if(data.user){
    query = `?user=${data.user}`;
  }
  
  return get(`${BASE_URL}/courses/${course}/quizResponses/count${query}`);
}

api.getQuestionResponses = (course, quiz, questionIndex) => {
  return get(`${BASE_URL}/courses/${course}/quizzes/${quiz}/questions/${questionIndex}/responses`);
}
