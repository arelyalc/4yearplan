var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// A plan object is comprised of ids of these course objects 
// These are what are displayed on our dashboard
var CourseSchema = new mongoose.Schema({
    order: Number, // helps us calculate prerequisite dependencies
    id: String, // how the course is saved in the SMU caalog
    name: String, // name of the course
    UC: [String] // array of UC requirements satisfied 
});

module.exports = mongoose.model('Course', CourseSchema);