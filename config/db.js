var mongoose = require('mongoose');

var db = mongoose.connect("mongodb://dbuser:Emerald$999@ds249233.mlab.com:49233/4yearplandb");

module.exports = {
    //@Christian add mongodb instance here
    db
}