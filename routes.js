require('./models/course');
require('./models/plan');
require('./models/user');

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Plan = mongoose.model('Plan');
const Course = mongoose.model('Course');
const db = require('./db');

mongoose.set('debug', true);

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
		console.log(req.body); 
		var user = new User();
		user.name = req.body.name;
		user.smuId = req.body.smuId;
		user.email = req.body.email;
		user.password = req.body.password;
		//user.setPassword(req.body.password);

		console.log(user); 
		user.save(function (err, user) {
			if (err) {
				console.log(err); 
				return; 
			} else {
				res.status(200).json(user); 
			}
		});
	});
	// LOGIN
	// takes in smu id and password
	app.post('/api/login', function (req, res, next) {

		User.findOne({ smuId: req.body.smuId }, function (err, user) {
			if (err) {
				res.status(404).send(err);
				//throw err; 
			}
			if (req.body.password.trim() == user.password.trim()) {
				//console.log(user); 
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

	// CHANGE PASSWORD
	// app.put('/api/password', function (req, res, next) {
		
	// 	console.log("HIT CHANGE PASSWORD ROUTE"); 

	// 	var myquery = { _id: req.body.id };
	// 	var newvalues = { $set: { password: req.body.password } };
	// 	User.updateOne(myquery, newvalues, function (err, info) {
	// 		if (err) throw err;
	// 		res.status(200).json('Password updated');  
	// 	});

	// });


	// UPDATE PROFILE INFO
	//  Does password get changed here too?
	app.put('/api/users/:id', function (req, res, next) {
		
		console.log("HIT CHANGE PROFILE ROUTE"); 

		var myquery = { _id: req.params.id };
		var newvalues = { $set: { name: req.body.name,
								  email: req.body.email,
								  smuId: req.body.smuId,
								  password: req.body.password } };
		User.updateOne(myquery, newvalues, function (err, info) {
			if (err) throw err;
			res.status(200).json('Profile updated');  
		});

	});

	app.get('/api/user/:id', function(req, res, next) {
		
		console.log("HIT GET BY ID USER ROUTE"); 

		User.findOne({ _id: req.params.id }, function (err, user) {
			if (err) {
				res.status(404).send(err);
				//throw err; 
			}
			else if(user == null) {

				res.status(404).json("No user found");
			}
			else {
				
				res.status(200).send(user); 
			}
		});

		
	});


	// SAVE PREVIOUS CREDIT
	// pass in smuId and taken (array of class code strings)
	app.put('/api/prevCredit', function (req, res, next) {

		console.log("HIT PREV CREDIT ROUTE"); 

		var temp = req.body.taken;
		var final = [];

		for (var i = 0; i < temp.length; i++) {

			uc = temp[i];

			if (uc.indexOf(' ') >= 0) {

				var ucs = uc.split(' ');

				for (var j = 0; j < ucs.length; j++) {
					final.push(ucs[j]);
				}
			}
			else {
				final.push(uc);
			}

		}

		var myquery = { _id: req.body.id };
		var newvalues = { $set: { taken: final } };
		User.updateOne(myquery, newvalues, function (err, info) {
			//if (err) throw err;
			res.status(200).json('Previous credit added to user');  //CHECK THIS FUNCTION CALL
		});
	});

	// POST PLAN (save with userID)
	// pass in plan json and user id number 
	app.post('/api/saveCurrentPlan', function (req, res, next) {

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
		plan.altCourses = req.body.plan.altCourses;
		plan.userId = req.body.userId;

		plan.save(function (err, plan) {
			if (err) {
				res.status(400).json(err);
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

				if (plans == null) {
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

	app.get('/api/courses', function(req, res, next) {

		Course.find().then(courses => {
			res.send(courses); 
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving courses"
			});
		});
	});
}