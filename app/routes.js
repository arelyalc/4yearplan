var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// REGISTER
	app.post('/api/register', function(req, res, next) {

		var user = new User(); //check with christian make sure random id is part of this

		user.name = req.body.name;
		user.email = req.body.email;
	  
		user.setPassword(req.body.password);
	  
		user.save(function(err) {
		  var token;
		  token = user.generateJwt();
		  res.status(200);
		  res.json({
			"token" : token
		  });
		});	  
		
	});

	// LOGIN
	app.post('/api/login', function(req,res,next) {

		passport.authenticate('local', function(err, user, info){
			var token;
		
			// If Passport throws/catches an error
			if (err) {
			  res.status(404).json(err);
			  return;
			}
		
			// If a user is found
			if(user){
			  token = user.generateJwt();
			  res.status(200);
			  res.json({
				"token" : token
			  });
			} else {
			  // If user is not found
			  res.status(401).json(info);
			}
		  })(req, res);
		

	});

	// RETRIEVE USER PROFILE
	app.get('/api/profile', function(req,res,next){

		User
		.findById(req.payload._id)
		.exec(function(err, user) {
			res.status(200).json(user);
		});

	});
	


	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	// Angular will actually handle the rest of routing
	// using client-side routing. The screens are: 
		// login
		// sign-up 
		// profile
		// dashboard
		// saved
		// generator


}