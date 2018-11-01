var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
    session_id: Integer,
    username: String,
    courses: []
});

module.exports = mongoose.model('session', SessionSchema);