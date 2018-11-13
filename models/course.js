var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var CourseSchema = new mongoose.Schema({
    order_id: Number,
    course_id: String,
    course_name: String,
    UC: [String] //array in case multiple requirements are satisfied 
});

module.exports = mongoose.model('Course', CourseSchema);