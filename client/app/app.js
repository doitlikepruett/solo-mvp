
var app = angular.module('myApp', [])


app.controller('MainController', function($scope, Query){

    $scope.score = 0;

    $scope.returnResults = Query.returnedResults;
    
    $scope.loadResults = Query.loadResults;

    $scope.guessCompare = Query.guessCompare;
    
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

      //  $http({ 
      //   method: 'JSONP',
      //   url: "http://suggestqueries.google.com/complete/search?client=chrome&q=" + newQuery,
      //   crossDomain: true,
      //   "headers": {
      //   "cache-control": "no-cache"
      //   }

      // }).then(function(resp){
      //   console.log("Success from loadResults!");
      //   returnedResults = resp.body;
      // }).catch(function(error){
      //   console.log(error);
      // })
  };


  var guessCompare = function(guessText){
    for (var i = 0; i<returnedResults[1].length; i++){
      if (returnedResults[1][i].slice(-guessText.length) === guessText){
          var points = 10 - i;
          console.log("You earned " + points + " points!" );
      }
    }
    console.log("Too bad, try again!");
  };


  return {
    returnedResults: returnedResults,
    loadResults: loadResults,
    guessCompare: guessCompare
  }
})