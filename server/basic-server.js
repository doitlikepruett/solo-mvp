var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connect to mongo db named 'suggestionDB or hosted instance'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/suggestionDB');

//add middleware and routing
require('./middleware.js')(app, express);
require('./routes.js')(app, express);

var port = process.env.PORT || 1347;

app.use(express.static(__dirname + '/../client'));

app.listen(port, function() {
  console.log('Server listening on ' + port)
});

module.exports  = app



