  var app = angular.module('mainController', []);

  app.controller('mainController', function($scope){

    $scope.score = 0;

    $scope.returnResults = [];
    
    $scope.loadResults = Query.loadResults;
    
  })