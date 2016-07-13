var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connect to mongo db named 'suggestionDB'
mongoose.connect('mongodb://localhost/suggestionDB');

//add middleware and routing
require('./middleware.js')(app, express);
require('./routes.js')(app, express);

var port = process.env.PORT || 5555;

app.use(express.static(__dirname + '/../client'));

app.listen(port, function(){
  console.log('Server listening on ' + port)
});

module.exports  = app

