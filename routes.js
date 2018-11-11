require('./models/class');
require('./models/plan');
require('./models/user');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Plan = mongoose.model('Plan');
var Class = mongoose.model('Class');
var db = require('./db');

module.exports = function (app) {

	// server routes ===========================================================
	// TODO: CHECK AUTH ROUTES, may need to add "db."

	// REGISTER
	// takes in name email smu id and password
	app.post('/api/register', function (req, res, next) {

		var user = new User(); //check with christian make sure random id is part of this

		user.name = req.body.name;
		user.smuId = req.body.id;
		user.email = req.body.email;

		user.setPassword(req.body.password);

		user.save(function (err) {
			var token;
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		});

	});

	// LOGIN
	// takes in ?? where does user come from? come back to this
	app.post('/api/login', function (req, res, next) {

		// how does passport know what user is 
		passport.authenticate('local', function (err, user, info) {
			var token;

			// If Passport throws/catches an error
			if (err) {
				res.status(404).json(err);
				return;
			}

			// If a user is found
			if (user) {
				token = user.generateJwt();
				res.status(200);
				res.json({
					"token": token
				});
			} else {
				// If user is not found
				res.status(401).json(info);
			}
		})(req, res);

	});

	// RETRIEVE USER PROFILE
	// what is this even used for, shouldn't the previous
	// post just also send back the user if found? ya I think so 
	app.get('/api/profile', function (req, res, next) {

		User
			.findById(req.payload._id)
			.exec(function (err, user) {
				res.status(200).json(user);
			});

	});

	// SAVE PREVIOUS CREDIT
	// pass in smuID and taken (array of class code strings)
	app.post('/api/prevCredit', function (req, res, next) {

		var myquery = { smuId: req.smuId };
		var newvalues = { $set: { taken: req.taken } };
		db.collection("users").updateOne(myquery, newvalues, function (err, res) {
			if (err) throw err;
			console.log("Previous credit added to user");
		});

	});

	// GET ALL SAVED PLANS
	// pass in smu id in request url
	app.get('/api/savedPlans', function (req, res, next) {
		db.collection("plans").find({

			smuID: req.query.smuID
			
		}).then(plans => {

			res.send(plans);

		}).catch(err => {

			res.status(500).send({
				message: err.message || "Some error occurred while retrieving user plans"
			});

		});

	});

	// POST PLAN (save with userID)
	// pass in plan json and user id number 
	// app.post('/api/saveCurrentPlan', function(req, res, next) {
	// 	db.collection
	// })

	// GET PLAN (generate plan given user)
	//app.get
	//and then get all classes
	//get user's taken array
	//subtract
	//send diff




	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.sendfile('./public/index.html');
	});

}