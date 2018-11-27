// import security and db libraries 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

// access and import user model
require('./models/user'); 
var User = mongoose.model('User');

// use local strategy aka username and password
passport.use(new LocalStrategy({

    // editing local strategy to ask for email
    // instead of username
    usernameField: 'smuId'
  },
  function(username, password, done) {

    // mongo query for user
    User.findOne({ smuId: username }, function (err, user) {
      if (err) { 
        console.log(err); 
        return;
      }
      // return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // return if password is wrong
      // calls valid password function in userSchema.methods
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // if credentials are correct, return the user object
      return done(null, user._id);
    });
  }
));