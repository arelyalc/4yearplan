var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PlanSchema = new mongoose.Schema({
    name: String, 
    sem1: [String], //each semester is an arr of obj ids
    sem2: [String], //object ids reference class objects
    sem3: [String],
    sem4: [String],
    sem5: [String],
    sem6: [String],
    sem7: [String],
    sem8: [String],
    userId: Number //tied to user
    
});

module.exports = mongoose.model('Plan', PlanSchema);