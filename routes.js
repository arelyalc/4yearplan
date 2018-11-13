require('./models/course');
require('./models/plan');
require('./models/user');

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Plan = mongoose.model('Plan');
const Course = mongoose.model('Course');
const db = require('./db');

// const fs = require('fs'); 
// var rawData = fs.readFileSync('courses.json');
// var courses = JSON.parse(rawData); 

// console.log(courses[0].id); 

module.exports = function (app) {

	// server routes ===========================================================
	// TODO: CHECK AUTH ROUTES, may need to add "db."

	// REGISTER
	// takes in name email smu id and password
	app.post('/api/register', function (req, res, next) {

		var user = new User(); 
		user.name = req.body.name;
		user.smuId = req.body.smuId;
		user.email = req.body.email;
		user.password = req.body.password; 

		//user.setPassword(req.body.password);

		user.save(function (err, user) {
			if (err) return console.error(err);
			res.status(200).json(user); 
		});
	});
	// LOGIN
	// takes in smu id and password
	app.post('/api/login', function (req, res, next) {
		
		User.findOne({ smuId: req.body.smuId }, function(err, user){
			if (err) {
				res.status(404).send(err); 
				//throw err; 
			}
			if (req.body.password.trim() == user.password.trim()) {
				res.status(200).send(user._id); 
			} 
			else {
				res.status(500).send('Invalid password'); 
			}
		});
		// how does passport know what user is 
		// passport.authenticate('local', function (err, user, info) {
		// 	var token;

		// 	// If Passport throws/catches an error
		// 	if (err) {
		// 		res.status(404).json(err);
		// 		return;
		// 	}

		// 	// If a user is found
		// 	if (user) {
		// 		token = user.generateJwt();
		// 		res.status(200);
		// 		res.json({
		// 			"token": token
		// 		});
		// 	} else {
		// 		// If user is not found
		// 		res.status(401).json(info);
		// 	}
		// })(req, res);

	});


	// SAVE PREVIOUS CREDIT
	// pass in smuId and taken (array of class code strings)
	app.put('/api/prevCredit', function (req, res, next) {

		var temp = req.body.taken;
		var final = []; 

		for(var i=0; i<temp.length; i++) {

			uc = temp[i]; 

			if(uc.indexOf(' ') >= 0) {

				var ucs = uc.split(' '); 

				for(var j=0; j<ucs.length; j++) {
					final.push(ucs[j]); 
				}
			} 
			else {
				final.push(uc); 				
			}

		}
		
		var myquery = { _id: req.body.id };
		var newvalues = { $set: { taken: final} };
		User.updateOne(myquery, newvalues, function (err, info) {
			//if (err) throw err;
			res.status(200).json('Previous credit added to user');  //CHECK THIS FUNCTION CALL
		});
	});

	// POST PLAN (save with userID)
	// pass in plan json and user id number 
	app.post('/api/saveCurrentPlan', function(req, res, next) {

		var plan = new Plan();
		plan.name = req.body.plan.name;
		plan.date = req.body.plan.date; 
		plan.sem1 = req.body.plan.sem1; 
		plan.sem2 = req.body.plan.sem2; 
		plan.sem3 = req.body.plan.sem3; 
		plan.sem4 = req.body.plan.sem4; 
		plan.sem5 = req.body.plan.sem5; 
		plan.sem6 = req.body.plan.sem6; 
		plan.sem7 = req.body.plan.sem7; 
		plan.sem8 = req.body.plan.sem8; 
		plan.userId = req.body.userId;

		plan.save(function (err, plan) {
			if (err) {
				handleError(err);
			} 
			else {
				res.status(200).json(plan); 
			}

			
		});		
	})


	// GET ALL SAVED PLANS
	// pass in smu id in request url
	app.get('/api/savedPlans/:id', function (req, res, next) {
	
		Plan.find({ userId: req.params.id })
			.then(plans => {

				if(plans == null) {
					res.send('No saved plans'); 
				}
				else {
					res.send(plans); 
				}
			}).catch(err => {

				res.status(500).send({
					message: err.message || "Some error occurred while retrieving user plans"
				});
			});
	});

	// takes in user id, use that to find user to get taken array
	// for gets, param is sent in url, access with req.query.id
	app.get('/api/genPlan/:id', function(req, res, next) {

		var obj = {  
			sem1: ["BLAH BLAH", "BLAH BLAH", "BLAH BLAH", "BLAH BLAH", "BLAH BLAH"],
			sem2: ["BLAH BLAH", "BLAH BLAH", "BLAH BLAH", "BLAH BLAH", "BLAH BLAH"],
			sem3: ["BLAH BLAH", "BLAH BLAH", "BLAH BLAH", "BLAH BLAH", "BLAH BLAH"],
			sem4: ["BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH"],
			sem5: ["BLAH BLAH", "BLAH BLAH","BLAH BLAH", "BLAH BLAH","BLAH BLAH"],
			sem6: ["BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH"], 
			sem7: ["BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH"], 
			sem8: ["BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH","BLAH BLAH"]
		};

		res.send(obj); 

		// Final object to send back
		var plan = {};
		
		// Keeps track of class number
		var num = 1; 	

		// Goes through each semester
		for(var i=0; i<8; i++) {
			
			// Array of classes for that semester
			var temp = []; 	
				
			// Fifteen hours per semester
			while(temp.length < 5) {

				// Retrieve next course	
				Course.find({ order: num})
		// 			.then(courses => {

		// 				if(courses.length == 1) {
		// 					//make taken into a hash set
							
		// 					// UC = courses.UC
		// 					// for each string in UC
		// 					// 	if taken.contains UC
		// 					//		break (I don't want to add this course to this semester)

		// 					temp.push(courses.course_id); 
		// 				}


		// 			}).catch(err => {

		// 				res.status(500).send({
		// 					message: err.message || "Some error occurred while retrieving user plans"
		// 				});
		// 			});

		// 		num++;
			}


		}


	});




	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.sendFile('./public/index.html');
	});

}