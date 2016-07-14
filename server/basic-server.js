var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connect to mongo db named 'suggestionDB'
mongoose.connect('mongodb://localhost/suggestionDB' || 'mongodb://heroku_g1sph5gs:kabe1vjced31m77ek7np2dfus1@ds037447.mlab.com:37447/heroku_g1sph5gs');

//add middleware and routing
require('./middleware.js')(app, express);
require('./routes.js')(app, express);

var port = process.env.PORT || 5555;

app.use(express.static(__dirname + '/../client'));

app.listen(port, function() {
  console.log('Server listening on ' + port)
});

module.exports  = app


// MONGODB_URI: mongodb://heroku_g1sph5gs:kabe1vjced31m77ek7np2dfus1@ds037447.mlab.com:37447/heroku_g1sph5gs
