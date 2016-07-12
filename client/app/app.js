
var app = angular.module('myApp', [])


app.controller('MainController', function($scope, Query){

    $scope.score = 0;

    $scope.returnResults = Query.returnedResults;
    
    $scope.loadResults = Query.loadResults;

    $scope.guessCompare = Query.guessCompare;

    $scope.message = '';
    
  });



app.factory('Query', function($http){

  var returnedResults;

  var loadResults = function(newQuery){

      newQuery = newQuery.split(' ').join('_');
      
      var url = "http://suggestqueries.google.com/complete/search?client=chrome&q=" + newQuery + "&callback=JSON_CALLBACK";

      $http.jsonp(url)
          .success(function(data){
              returnedResults = data;
              console.log(returnedResults);
          })
          .error(function(data){
            console.log("loadResults REQUEST ERROR", data)
          });     
  };


  var guessCompare = function(guessText){
    for (var i = 0; i<returnedResults[1].length; i++){
      if (returnedResults[1][i].slice(-guessText.length) === guessText){
          var points = 10 - i;
          this.score += points;
          this.message = "Hooray! You guessed number " + (i+1) + " in the list! \nYour score increased by " + points;
          return;
      }
      
    }
    this.message = "Sorry friendo, guess again!";
  };


  return {
    returnedResults: returnedResults,
    loadResults: loadResults,
    guessCompare: guessCompare
  }
})