// access model files
require('./models/course');
require('./models/plan');
require('./models/user');

// import security and db libraries
const passport = require('passport');
const mongoose = require('mongoose');

// import models and db
const User = mongoose.model('User');
const Plan = mongoose.model('Plan');
const Course = mongoose.model('Course');
const db = require('./db');

// used for back end debugging and testing
mongoose.set('debug', true);

// back end routes exported to server.js
module.exports = function (app) {


	// REGISTER
	// takes in name email smu id and password
	app.post('/api/register', function (req, res, next) {
		
		// initialize User object
		var user = new User();
		user.name = req.body.name;
		user.smuId = req.body.smuId;
		user.email = req.body.email;
		
		// use schema method to hash password
		user.setPassword(req.body.password);

		// save document to user collection
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

		// Login without using passport library, before hashing passwords

		// User.findOne({ smuId: req.body.smuId }, function (err, user) {
		// 	if (err) {
		// 		res.status(404).send(err);
		// 		//throw err; 
		// 	}
		// 	if (req.body.password.trim() == user.password.trim()) {
		// 		//console.log(user); 
		// 		res.status(200).send(user._id);
		// 	}
		// 	else {
		// 		res.status(500).send('Invalid password');
		// 	}
		// });

		// Login using passport library to re-hash and compare passwords, 
		// as well as generate jwt for session management
		passport.authenticate('local', function (err, user, info) {
			var token;

			// if Passport throws/catches an error
			if (err) {
				res.status(404).json(err);
				return;
			}

			// if a user is found
			if (user) {
				
				// access user schema method to generate jwt 
				token = user.generateJwt();
				res.status(200);
				res.json({
					// send token back to front
					"token": token
				});
			} else {
				// if user is not found
				res.status(401).json(info);
			}
		})(req, res);

	});




	// UPDATE PROFILE INFO
	// takes in new uer object
	app.put('/api/users/:id', function (req, res, next) {

		// find current user to update based on id
		var myquery = { _id: req.params.id };
		// save new values in $set object
		var newvalues = {
			$set: {
				name: req.body.name,
				email: req.body.email,
				smuId: req.body.smuId,
				password: req.body.password
			}
		};

		// update user doc
		User.updateOne(myquery, newvalues, function (err, info) {
			if (err) throw err;
			res.status(200).json('Profile updated');
		});

	});

	// GET USER BY ID
	// takes in user id, reruns entire user object
	app.get('/api/user/:id', function (req, res, next) {

		// takes id from url query param
		User.findOne({ _id: req.params.id }, function (err, user) {
			if (err) {
				res.status(404).send(err);
				//throw err; 
			}
			else if (user == null) {
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

		// look for specific user 
		var myquery = { _id: req.body.id };
		
		// save taken array to $set objet
		var newvalues = { $set: { taken: req.body.taken } };
		
		// update user doc
		User.updateOne(myquery, newvalues, function (err, info) {
			if (err) throw err;
			res.status(200).json('Previous credit added to user');  
		});
	});

	// POST PLAN (save with userID)
	// pass in plan json and user id number 
	app.post('/api/saveCurrentPlan', function (req, res, next) {

		// parse plan object sent in request parameter
		// save each attribute in new plan object and
		// add user ID as part of the plan
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

		// add plan as new document in collection 
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

		// parse request url for id, and find all plans in the
		// collection that contain that id
		Plan.find({ userId: req.params.id })
			.then(plans => {

				// if none, return message to front
				if (plans == null) {
					res.send('No saved plans');
				}
				// else, return all the plans to display list of saved plans
				else {
					res.send(plans);
				}
				// error handling
			}).catch(err => {

				res.status(500).send({
					message: err.message || "Some error occurred while retrieving user plans"
				});
			});
	});

	// GET ALL COURSES
	// simply returns all courses to the front end for plan calculation
	app.get('/api/courses', function (req, res, next) {

		Course.find().then(courses => {
			res.send(courses);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving courses"
			});
		});
	});
}