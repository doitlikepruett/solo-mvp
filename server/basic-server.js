var express = require('express');


var app = express();

var port = process.env.PORT || 5555;

app.use(express.static('/client/index.html', __dirname + '/../client'));

app.listen(port, function(){
  console.log('Server listening on ' + port)
});

module.exports  = app