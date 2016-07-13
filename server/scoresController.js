var stats = require('./scoresModel.js');

var Q = require('q');

var getAllPlayerData = Q.nbind(stats.find, stats);
var findUser = Q.nbind(stats.findOne, stats);
var createUser = Q.nbind(stats.create, stats);
var updateScore = Q.nbind(stats.findOneAndUpdate, stats);

var allStats = function(req, res, next){
  getAllPlayerData({})
    .then(function(data){
      res.json(data);
    })
    .fail(function(error){
      console.log("allStats error from scoresController ", error);
      next(error);
    })
};

var addStatsToDB = function(req, res, next){
  console.log(req.body, '11111');
  var player = req.body.player;
  var score = req.body.score;

  findUser({player: player})
    .then(function(user){
      if (!user){
        return createUser({ //#why do I need a return statement here?
          player: player,
          score: score
        })
      } else {
        updateScore({player: player}, {$set:{score:score}}, {new: true}, function(err, updatedRecord){
          if (err){
            console.log("Error when updating this user score!", err);
          }
          console.log("This is the updated record", updatedRecord);
        })
      }
    }).fail(function(error){
      console.log(error)
    })

}

module.exports = {
  allStats: allStats,
  addStatsToDB: addStatsToDB
}