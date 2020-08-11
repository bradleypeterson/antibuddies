/**
 * endpoints.js
 * routes used by this project's demo pages
 */


const User = require('./models/user.js');


//Exporting a default value
module.exports = (app) => {
  const api = require('./api.js')(app);
  
  //login page
  app.get("/login", function(req, res){
    res.sendFile(__dirname + "/pages/login.html");
  });
  app.post("/login", function(req, res){
    api.authorize(req.body).then((user) => {
      res.status(200).send('Success' + JSON.stringify(user));
    }).catch(err => {
      res.status(400).send(err);
    });
  });
  
  
  //logout page
  app.get("/logout", function(req, res){
    res.sendFile(__dirname + "/pages/logout.html");
  });
  app.post("/logout", function(req, res){
    app.logout(req.body).then((user) =>{
      res.status(200).send('Success' + JSON.stringify(user));
    }).catch(err => {
      res.status(400).send(err);
    });
  });
  
  
  //Index page
  app.get("/", function(req, res){
    res.sendFile(__dirname + "/pages/index.html");
  });
  
  app.post("/", function(req, res){  
    let {user, first, last, pass, admin} = req.body;
    
    res.write("Username: " + user + "\n");
    res.write("First Name: " + first + "\n");
    res.write("Last Name: " + last + "\n");
    res.write("Password: " + pass + "\n");
    res.write("Admin: " + admin);
    res.send();
  });
  
  //User Sign up
  app.post("/signup", (req, res) => {
    api.signup(req.body).then((user) => {
      console.log('dsfds');
      //res.status(200).send('success! ' + JSON.stringify(user));
    }).catch(err => {
      res.status(400).send(err);
    });
  });
  
  //api page
  app.get("/api", function(req, res){
    res.sendFile(__dirname + "/pages/api.html");
  });
  
  //api page
  app.get("/test/sdk", function(req, res){
    res.sendFile(__dirname + "/pages/test/sdk.html");
  });
  
};
