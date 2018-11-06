var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ClassSchema = new mongoose.Schema({
    course_id: Number,
    course_name: String,
    prereqs: [ObjectId],
    req: [String] //array in case multiple requirements are satisfied
});

module.exports = mongoose.model('Class', ClassSchema);