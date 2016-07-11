
angular.module('suggestion.app', [])

.factory('Query', function($http){
  var loadResults = function(text){
      return $http({
        method: 'GET',
        url: "http://suggestqueries.google.com/complete/search?client=chrome&q=hello"
      }).then(function(resp){
        return resp;
      }).catch(function(error){
        console.log(error);
      })
  }
});