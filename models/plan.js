var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PlanSchema = new mongoose.Schema({
    name: String, 
    date: Date,
    sem1: [String], 
    sem2: [String], 
    sem3: [String],
    sem4: [String],
    sem5: [String],
    sem6: [String],
    sem7: [String],
    sem8: [String],
    userId: Number //tied to user
    
});

module.exports = mongoose.model('Plan', PlanSchema);