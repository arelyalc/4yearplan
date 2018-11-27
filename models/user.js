// import db, hashing, and jwt libaries
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  smuId: Number,
  password: String, // salt used to obfuscate password
  hash: String, // hash of password
  taken: [String] // array of courses taken
});

// function used by server route
UserSchema.methods.setPassword = function (password) {

    console.log('Hashing password'); 
    // create salt, hash password, and save hash
    bcrypt.genSalt(10, function (err, salt) {
      if (err) console.log(err); 
      bcrypt.hash(password, salt, function (err, hash) {
        if(err) {
          console.log(err); 
          console.log('Password not saved'); 
        } else {
          this.hash = hash; 
          console.log('Hash saved'); 
        }
      });
    });
};

// function to validate password
UserSchema.methods.validPassword = function (password) {
  // hash input and compare with saved hash
  bcrypt.compare(password, this.hash, function (err, res) {
    return res;
  });
};

// use date and user attributes, sign with encryption algorithm
// and return token
UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    smuId: this.smuId,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "4YRTOKE"); 
};

module.exports = mongoose.model('User', UserSchema);