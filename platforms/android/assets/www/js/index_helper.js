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
var _setLocation = false;
var startPoss;
var fileSelector = false;
var goodPoint = false;
var currentLoc;
var lastLoc = new point(0,0);
var needsStarted = true;


const KILOMETERTOFEET = 3280.84;
const KILOTOMILE = 0.621371
const K_MILL_SEC = 1000;



var mode = "walk"


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
[ 0 ,  -3 ],
[ 1 ,  0 ],
[ 2 ,  3 ],
[ 3 ,  6 ],
[ 4 ,  8 ],
[ 5 ,  8 ],
[ 6 ,  7 ],
[ 7 ,  7 ],
[ 8 ,  7 ],
[ 9 ,  7 ],
[ 10 ,  7 ],
[ 11 ,  7 ],
[ 12 ,  7 ],
[ 13 ,  7 ],
[ 14 ,  7 ],
[ 15 ,  7 ],
[ 16 ,  7 ],
[ 17 ,  7 ],
[ 18 ,  7 ] ];




document.addEventListener("deviceready", onDeviceReady, false);
// document.addEventListener("touchstart", function() {}, false);


function onDeviceReady() {
  console.log("device is ready in helper");
    
}

function load_test_data(){
    for (var i = 0;i< testdata.length;i++) {
        var temp_arr = testdata[i];
        var a_point = new point(temp_arr[0],temp_arr[1])
        
        addDataToChart(a_point);
    };
}


// function tryEmail(){
//     console.log("tryEmail called");
//     var _body = receiverString('body');
//     var userinfo = receiverString('userinfo').split(/~/);
//     var attachment;

//     if (!logOb) {
//         // attachment = image 
//         console.log("no log ob");
//     }else{
//         attachment = logOb.nativeURL;
//     }

//     cordova.plugins.email.isAvailable(
//     function (isAvailable) {
        
//         cordova.plugins.email.open({
//             to:      userinfo[2],
//             cc:      userinfo[1],
//             bcc:     [],
//             subject: 'Chart data from '+userinfo[0],
//             body:    _body,
//             attachments: [attachment]
//         });
//     }
// );
// }
function tryEmail(){
    cordova.plugins.email.open({
                    to:          ['person1@domain.com'],
                    cc:          ['person2@domain.com'],
                    bcc:         ['person3@domain.com', 'person4@domain.com'],
                    attachments: ['file://styles/images/logo.png', 'file://styles/images/logo2x.png'],
                    subject:     'EmailComposer plugin test',
                    body:        '<h2>Hello!</h2>This is a nice <strong>HTML</strong> email with two attachments.',
                    isHtml:      true
                }, this);
        

        
//     console.log("tryEmail called");

//     cordova.plugins.email.isAvailable(
//     function (isAvailable) {
//         console.log("tryEmail isAvailable");
        
//         cordova.plugins.email.open({
//             to:      "soandso@gmail.com",
//             cc:      [],
//             bcc:     [],
//             subject: 'Chart data from ',
//             body:    "word",
//             attachments: []
//         });
//     }
// );
}










