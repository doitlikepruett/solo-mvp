  var app = angular.module('mainController', ['suggestion.app']);

  app.controller('mainController', ['$scope', function($scope){
    $scope.loadResults = console.log('working!');
    $scope.score = 0
  }])