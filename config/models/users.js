var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    session_id: Integer,
    status: Integer,
    full_name: String
});

module.exports = mongoose.model('users', UserSchema);