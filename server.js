// modules =================================================
var express        = require('express'); // server
var app            = express(); // initializing server
var mongoose       = require('mongoose'); // mongo client
var bodyParser     = require('body-parser'); // for parsing requests
var methodOverride = require('method-override'); // for http headers handling
var passport       = require('passport');  // for auth
const cors         = require('cors');  // for allowing cors

// configuration ===========================================	
// config files
var db = require('./db');
var pass = require('./passport');
// set port and connect to db
var port = process.env.PORT || 3000; 
mongoose.connect(db.url, {useNewUrlParser: true}); 

// api middleware =========================================
app.use(cors()); // allow cors
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(passport.initialize()); // for auth

// routes ==================================================
require('./routes')(app); // pass our application into our exported back endroutes

// start app ===============================================
app.listen(port);   // start server
console.log('Magic happens on port ' + port); 	// shoutout to the user
exports =  module.exports = app; 				// expose app
