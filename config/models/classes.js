var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    course_no: Integer,
    course_name: String
});

module.exports = mongoose.model('classes', ClassSchema);