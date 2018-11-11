var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PlanSchema = new mongoose.Schema({
    name: String, 
    sem1: [ObjectId], //each semester is an arr of obj ids
    sem2: [ObjectId], //object ids reference class objects
    sem3: [ObjectId],
    sem4: [ObjectId],
    sem5: [ObjectId],
    sem6: [ObjectId],
    sem7: [ObjectId],
    sem8: [ObjectId],
    smuID: Number //tied to user
    
});

module.exports = mongoose.model('Plan', PlanSchema);