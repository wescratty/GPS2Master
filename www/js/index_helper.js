// globa vars 
var refreshIntervalId = null;
var dataOutArray = [];
var pointsArray = [];
var coorPoints = [];
var non_lat_long_Points = [];
var distancePoints = [];
var accelerationPoints = [];
var positionPoints = [];
var ratePoints = [];
var distance = [];
var rate = [];
var acceleration = [];
var drawArray = [];

var startTime;
var count = 0;
var time = 0;
var un;// used to reset things

var total_distance;
var lineChart;
var canvas;
var ctx;
var logOb;
var fileName;
var fileApp;
var startPoss;
var user_email;
var user_password;

var _fromStartPoint = false;
var fileSelector = false;
var goodPoint = false;
var currentLoc;
var lastLoc = new Point(0,0);
var needsStarted = true;

var transferingData = false;
var alertDialog;

const K_MILL_SEC = 1000;



var mode = 'drive';


// this is x^3
// var testdata = [
// [ 0 ,  0 ],
// [ 1 ,  0.258819 ],
// [ 2 ,  0.5 ],
// [ 3 ,  0.7071068 ],
// [ 4 ,  0.8660254 ],
// [ 5 ,  0.9659258 ],
// [ 6 ,  1 ],
// [ 7 ,  0.9659258 ],
// [ 8 ,  0.8660254 ],
// [ 9 ,  0.7071068 ],
// [ 10 ,  0.5 ],
// [ 11 ,  0.258819 ],
// [ 12 ,  0.0 ],
// [ 13 ,  -0.258819 ],
// [ 14 ,  -0.5 ],
// [ 15 ,  -0.7071068 ],
// [ 16 ,  -0.8660254 ],
// [ 17 ,  -0.9659258 ],
// [ 18 ,  -1 ],
// [ 19 ,  -0.9659258 ],
// [ 20 ,  -0.8660254 ],
// [ 21 ,  -0.7071068 ],
// [ 22 ,  -0.5 ],
// [ 23 ,  -0.258819 ],
// [ 24 ,  0.0 ]
//                 ];
var testdata = [
    
    [ 4 ,  0 ],
    [ 5 ,  1.732868 ],
    [ 6 ,  2.7465307 ],
    [ 7 ,  3.4657359 ],
    [ 8 ,  4.0235948 ],
    [ 9 ,  4.4793987 ],
    [ 10 ,  4.8647754 ],
    [ 11 ,  5.1986039 ],
    [ 12 ,  5.4930614 ],
    [ 13 ,  5.7564627 ],
    [ 14 ,  5.9947382 ],
    [ 15 ,  6.2122666 ],
    [ 16 ,  6.4123734 ],
    [ 17 ,  6.5976433 ],
    [ 18 ,  6.7701255 ],
    [ 19 ,  6.9314718 ],
    [ 20 ,  7.0830334 ],
    [ 21 ,  7.2259294 ],
    [ 22 ,  7.3610974 ],
    [ 23 ,  7.4893307 ]


];

// var app = angular.module('app', ['ngMessages']);
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
  console.log("device is ready in helper");
}

function prep_test_data(){
    _fromStartPoint= !_fromStartPoint;
    var temp = testdata;
    reset();
    testdata = temp;
    var c_point = new Point(testdata[0][0],testdata[0][1]);

    for (var i = 1;i< testdata.length;i++) {

        var a_point = new Point(testdata[i][0],testdata[i][1]);
        var b_point = new Point(testdata[i-1][0],testdata[i-1][1]);
        
        addDataToChart(a_point,b_point);
        // checkPoint(b_point,a_point,c_point);
    }
}

function load_test_data(){
    for (var i = 1;i< testdata.length;i++) {
        var a_point = testdata[i];
        var b_point =    testdata[i-1];
        checkPoint(b_point,a_point,testdata[0]);
    }
}

function set_fromStartPoint_true(){
    _fromStartPoint = true;
}
function set_fromStartPoint_false(){
    _fromStartPoint = false;
}
function tryEmail(){

    /* TODO Drew, we need to get user email from sign in */

    var userinfo = receiverString('userinfo').split(/~/);
    var attachment;


    if (!logOb) { 
        alert("You havent made a file yet. Please conseider returning to graph and pressing start. Then go to expoert and save data.");
    }else{
        attachment = logOb.nativeURL;
    }

    cordova.plugins.email.isAvailable(
    function () {
        
        cordova.plugins.email.open({
            to:      "doranillich@gmail.com",
            cc:      "wescratty@gmail.com",
            bcc:     [],
            subject: 'Chart data from '+"Wes",
            body:    "This is only a test. This is a test of the...",
            attachments: [attachment]
        });
    }
);
}

function grabCredentials() {
    
    // if(document.getElementById("useremail").value && document.getElementById("password").value){
    //     user_email = document.getElementById("useremail").value;
    //     user_password = document.getElementById("password").value;
    //     console.log("user_email: ",user_email);
    //     console.log("user_password: ",user_password);
    //     myNavigator.resetToPage('sliding_menu.html', {animation : 'lift' });
    //
    // } else{
    //     alert("User name and password required");
    //
    // }
    

}


