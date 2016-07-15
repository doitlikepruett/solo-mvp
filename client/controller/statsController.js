angular.module('myApp.stats', [])
.controller('StatsController', function($scope, Query){

  $scope.allStats;

  $scope.scores = function(){
    console.log('hello from scores')
    Query.getScores();
  };



})
