var mongoose = require('mongoose');

var ScoresSchema = new mongoose.Schema({
//#Perhaps these need to be together in one object instead of together?
  player:{
    type: String,
    required:true
  }, 
  score:{
    type: Number,
    required:true
  }
});


module.exports = mongoose.model('Stats', ScoresSchema);