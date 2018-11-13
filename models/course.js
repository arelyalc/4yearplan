var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var CourseSchema = new mongoose.Schema({
    order: Number,
    id: String,
    name: String,
    UC: [String] //array in case multiple requirements are satisfied 
});

module.exports = mongoose.model('Course', CourseSchema);