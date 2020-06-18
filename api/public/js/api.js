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

var api = {};

api.post = post;
api.get = get;


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
