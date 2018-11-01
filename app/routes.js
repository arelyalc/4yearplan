import express from 'express';
import Users from '../config/models/users';
import Session from '../config/models/session';
import Classes from '../config/models/classes';
const userrouter = express.Router();

//routing examples..? replace with actually useful routing, probably.
userrouter.route('/')
	.get((req,res) => {
		Users.find({}, (err, users) => {
			res.json(users)
		})
	})
	.post((req, res) => {
			//post a new user to the system
	})
userrouter.route('/:userID')
	.get((req, res) => {
		Users.findById(req.params.userID,  (err, book) => {
			res.json(users)
		})
	})



module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};