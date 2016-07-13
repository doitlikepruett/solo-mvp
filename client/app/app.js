var enteredPlayerName = prompt('Enter a username');

var app = angular.module('myApp', [])


app.controller('MainController', function($scope, Query){

    $scope.score = 0;

    $scope.returnResults = Query.returnedResults;

    $scope.allResults = Query.allResults;
    
    $scope.loadResults = Query.loadResults;

    $scope.guessCompare = Query.guessCompare;

    $scope.message = '';

    $scope.player = enteredPlayerName;

    $scope.addPlayer = Query.addPlayer;
    
  });



app.factory('Query', function($http){

  var returnedResults;
  var allResults;

  var loadResults = function(newQuery){

      newQuery = newQuery.split(' ').join('_');
      
      var url = "http://suggestqueries.google.com/complete/search?client=chrome&q=" + newQuery + "&callback=JSON_CALLBACK";

      $http.jsonp(url)
          .success(function(data){
              returnedResults = data;
              allResults = data[1];
              console.log(returnedResults);
          })
          .error(function(data){
            console.log("loadResults REQUEST ERROR", data)
          });     
  };


  var guessCompare = function(guessText){

    for (var i = 0; i<returnedResults[1].length; i++){
      if (returnedResults[1][i].slice(-guessText.length) === guessText){
          var points = 20 - i;
          this.score += points;
          this.message = "Hooray! You guessed number " + (i+1) + " in the list! \nYour score increased by " + points;
          return;
      }
      
    }
    this.message = "Sorry friendo, guess again!";
  };

    var getScores = function(){
    return $http({ //#return statement needed here?
      method: "GET",
      url: '/allStats'
    }).then(function(resp){
      console.log(resp);
      return resp.data;
    }).catch(function(err){
      console.log("There was an error getting the all the scores ", err);
    })
  };

  var addPlayer = function(playerInfo){
    return $http({ //#return statement needed here?
      method: "POST",
      url: '/postScore',
      data: playerInfo
    }).then(function(resp){
      console.log('Post request sent successfully');
      return resp;
    }).catch(function(err){
      console.log("Error sending post request ", err);
    })
  }; 


  return {
    returnedResults: returnedResults,
    loadResults: loadResults,
    guessCompare: guessCompare,
    allResults: allResults,
    getScores: getScores,
    addPlayer: addPlayer
  }
})

// app.factory('Scores', function($http){
//   var getScores = function(){
//     return $http({ //#return statement needed here?
//       method: "GET",
//       url: '/allStats'
//     }).then(function(resp){
//       return resp.data;
//     }).catch(function(err){
//       console.log("There was an error getting the all the scores ", err);
//     })
//   };

//   var addPlayer = function(playerInfo){
//     return $http({ //#return statement needed here?
//       method: "POST",
//       url: '/postScore',
//       data: playerInfo
//     }).then(function(resp){
//       console.log('Post request sent successfully');
//       return resp;
//     }).catch(function(err){
//       console.log("Error sending post request ", error);
//     })
//   };  

// return {
//   getScores: getScores,
//   addPlayer: addPlayer
// }
// });