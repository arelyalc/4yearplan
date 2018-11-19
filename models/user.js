var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  smuId: Number,
  password: String,
  hash: String,
  taken: [String]
  //assumption: front handles ap translation to courses (or requirements, tbd)
});

UserSchema.methods.setPassword = function (password) {

    console.log('Hashing password'); 
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

UserSchema.methods.validPassword = function (password) {
  bcrypt.compare(password, this.hash, function (err, res) {
    return res;
  });
};

UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    smuId: this.smuId,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', UserSchema);