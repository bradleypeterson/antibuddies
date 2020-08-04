const jwt = require('jsonwebtoken');
const User = require('./models/user.js');

module.exports = (req, res, next) => {
  if(req.cookies.token){
    jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
      if(err){
        //token expired, probably
        //console.error(err);
        return next(); 
      }
      console.log('decoded:', decoded);
      User.findById(decoded.user_id).exec((err, user) => {
        console.log(user);
        req.user = user;
        //bump token expiration time for each authenticated request
        res.cookie('token', jwt.sign({user_id: user._id}, process.env.SECRET, { expiresIn: '5h' }));
        next();
      });
    });
  } else {
    next();
  }
}