var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
require('./models/user'); 
var User = mongoose.model('User');

passport.use(new LocalStrategy({

    // Editing local strategy to ask for email
    // instead of username
    usernameField: 'smuId'
  },
  function(username, password, done) {

    // Mongo query
    User.findOne({ smuId: username }, function (err, user) {
      if (err) { 
        console.log(err); 
        return;
      }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      // Calls valid password function in userSchema.methods
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user._id);
    });
  }
));