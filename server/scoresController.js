var Stats = require('./scoresModel.js');

var Q = require('q');

var getAllPlayerData = Q.nbind(Stats.find, Stats);
var findUser = Q.nbind(Stats.findOne, Stats);
var createUser = Q.nbind(Stats.create, Stats);
var updateScore = Q.nbind(Stats.findOneAndUpdate, Stats);

var allStats = function(req, res, next){
  console.log("Made it to the allStats!")
  getAllPlayerData({})
    .then(function(data){
      console.log('hello from allStats', data)
      res.json(data);
    })
    .fail(function(error){
      console.log("allStats error from scoresController ", error);
      next(error);
    })
};

var addStatsToDB = function(req, res, next){
  console.log(req.body, 'Post request made it to the server');
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
    }).then(function(user){
      res.sendStatus(201);
    }).fail(function(error){
      res.send(500)
      console.log("Server Post Request Error", error)
    })

}

module.exports = {
  allStats: allStats,
  addStatsToDB: addStatsToDB
}