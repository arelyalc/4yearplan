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

		var user = new User(); 
		user.name = req.body.name;
		user.smuId = req.body.smuId;
		user.email = req.body.email;
		user.password = req.body.password; 

		//user.setPassword(req.body.password);

		user.save(function (err, user) {
			if (err) return console.error(err);
			res.status(200);
			res.send('User saved'); 
		});
	});
	// LOGIN
	// takes in smu id and password
	app.post('/api/login', function (req, res, next) {
		
		User.findOne({ email : req.body.email }, function(err, user){
			if (err) {
				res.status(404);
				res.send('User not found'); 
				throw err; 
			}
			if (req.body.password == user.password) {
				res.status(200).json(user); 
			} 
			else {
				res.status(500); 
				res.send('Invalid password'); 
			}
		}
		);
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

		var myquery = { smuId: req.body.smuId };
		var newvalues = { $set: { taken: req.body.taken } };
		User.updateOne(myquery, newvalues, function (err, info) {
			if (err) throw err;
			res.status(200).json('Previous credit added to user'); 
		});
	});

	// POST PLAN (save with userID)
	// pass in plan json and user id number 
	app.post('/api/saveCurrentPlan', function(req, res, next) {
		
	})


	// GET ALL SAVED PLANS
	// pass in smu id in request url
	app.get('/api/savedPlans', function (req, res, next) {
		Plan.findOne({ smuId: req.query.smuId })
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

	
	// GET PLAN (generate plan given user)
	//app.get
	//and then get all classes
	//get user's taken array
	//subtract
	//send diff




	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.sendFile('./public/index.html');
	});

}