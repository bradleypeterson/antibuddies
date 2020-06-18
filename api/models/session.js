const mongoose = require("mongoose");
let ObjectId = mongoose.ObjectId;

// Session Storage
let sessionStorage = mongoose.Schema({
  sessionToken: String,
  user_id: ObjectId
});

module.export = mongoose.model("session", sessionStorage);

/*

Session {
  "sessoinToken": "Asdfasdfasdfasdfs654sadf8asdf987asfd",
  "user_id":      "aasdf54asdf489asdf5asdf6866asdfasdfa"
}

*/
