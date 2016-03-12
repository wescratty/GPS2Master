ons.bootstrap();

var app=angular.module('myApp', []);

app.controller("TestCtrl", function($scope){
  $scope.firstRanger=50;
  $scope.secondRanger = 150;
});
