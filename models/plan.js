var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PlanSchema = new mongoose.Schema({
    name: String, // name given by user to identify plan
    date: Date,   // when the user created the plan
    sem1: [String], // each semester is an array of course ids
    sem2: [String], 
    sem3: [String],
    sem4: [String],
    sem5: [String],
    sem6: [String],
    sem7: [String],
    sem8: [String],
    altCourses: [String], // contains alternatives to the suggested UC courses
    userId: String // one to many relationship between users and plans
    
});

module.exports = mongoose.model('Plan', PlanSchema);