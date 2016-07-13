var mongoose = require('mongoose');

var ScoresSchema = new mongoose.Schema({

  {player: String}, //#Perhaps these need to be together in one object instead of together?
  {score: Number)
});


module.exports = mongoose.model('stats', ScoresSchema);