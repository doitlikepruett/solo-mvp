
var app = angular.module('suggestion.app', [])

app.factory('Query', function($http){
  var loadResults = function(newQuery){
      return $http({
        method: 'GET',
        url: "http://suggestqueries.google.com/complete/search?client=chrome&q=" + newQuery
      }).then(function(resp){
        console.log(resp.body)
        return resp.body;
      }).catch(function(error){
        console.log(error);
      })
  }

  var guessCompare = function(guessText){
    //loop through results with concatenated string (newQuery + guessText)
      //if there's a match, display what ordinal position it was at
        //increment score by that much
      //if no match, display, "too bad! try again!"

  }

  return {
    loadResults: loadResults,
    guessCompare: guessCompare
  }
})