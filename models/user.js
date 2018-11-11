var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var ObjectId = mongoose.Schema.Types.ObjectId; 

var UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    smuId: Number, 
    password: String,
    hash: String, 
    salt: String, 
    taken: [String] 
    //assumption: front handles ap translation to courses (or requirements, tbd)
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(Math.ceil(16/2))
                      .toString('hex') /** convert to hexadecimal format */
                      .slice(0,16);   /** return required number of characters */
    hash = crypto.createHmac('sha512', this.salt); 
    hash.update(password); 
    this.hash = hash; 
    
     //this.salt = crypto.randomBytes(16).toString('hex');
    //this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

module.exports = mongoose.model('User', UserSchema);