// ons.bootstrap();

var app=angular.module('myApp', ['onsen.directives']);

app.controller("TestCtrl", function($scope){
  $scope.firstRanger=50;
  $scope.secondRanger = 150;
  $scope.foo = function(){
    alert("foo!");
  }
});


