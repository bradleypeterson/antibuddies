const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

// define the schema
let userSchema = mongoose.Schema({
  username          : String,
  firstName         : String,
  lastName          : String,
  password          : String,
  isAdmin           : Boolean
});


// methods -- Encrypted
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.checkPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

// create the model
module.exports = mongoose.model('User', userSchema);