// ons.bootstrap();

var app=angular.module('myApp', ['onsen.directives']);

app.controller("TestCtrl", function($scope){
 
  $scope.foo = function(){
    alert("foo!");
  }
});


