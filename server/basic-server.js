var express = require('express');
var cors = require('express-cors');

var app = express();

var port = process.env.PORT || 5555;

// app.use(cors(allowOrigins: ['google.com']))

// app.all('*', function(req, res, next) { 
//   res.header('Access-Control-Allow-Origin', '*'); 
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS'); 
//   res.header('Access-Control-Allow-Headers', 'Content-Type'); 
//   next(); 
// });

app.use(express.static(__dirname + '/../client'));

app.listen(port, function(){
  console.log('Server listening on ' + port)
});

module.exports  = app

