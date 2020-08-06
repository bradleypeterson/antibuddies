/**
 * server.js
 * initialize server, set up middleware
 */

//Import
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');

app.use(cookieParser());

//custom middleware for authenticating token and storing user
app.use(require('./session.js'));

//static folder
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
//...mongoose.connect(URI, options)
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

require('./endpoints.js')(app);