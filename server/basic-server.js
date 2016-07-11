var express = require('express');


var app = express();

var port = process.env.PORT || 5555;

app.use('/client/index.html', express.static(__dirname + '/../client'));

app.listen(port, function(){
  console.log('Server listening on ' + port)
});

module.exports  = app