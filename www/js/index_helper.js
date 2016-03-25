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
var _fromStartPoint = true;
var _gpsLocation = false;
var startPoss;
var fileSelector = false;
var goodPoint = false;
var currentLoc;
var lastLoc = new point(0,0);
var needsStarted = true;
var fromStartPoint = true;
var transferingData = false;
var _correct = false;


const KILOMETERTOFEET = 3280.84;
const KILOTOMILE = 0.621371
const K_MILL_SEC = 1000;



var mode = "walk"


// this is x^3

var testdata = 0;
var correctdata = [
    [ 2 , 0 ],
    [ 3 , 0 ],
    [ 4 , 0 ],
    [ 5 , 1.732868 ],
    [ 6 , 2.7465307 ],
    [ 7 , 3.4657359 ],
    [ 8 , 4.0235948 ],
    [ 9 , 4.4793987 ],
    [ 10 , 4.8647754 ],
    [ 11 , 5.1986039 ],
    [ 12 , 5.4930614 ],
    [ 13 , 5.7564627 ],
    [ 14 , 5.9947382 ],
    [ 15 , 6.2122666 ],
    [ 16 , 6.4123734 ],
    [ 17 , 6.5976433 ],
    [ 18 , 6.7701255 ],
    [ 19 , 6.9314718 ],
    [ 20 , 7.0830334 ],
    [ 21 , 7.2259294 ],
    [ 22 , 7.3610974 ],
    [ 23 , 7.4893307 ]
                ];

var wrongdata = [
    [ 2 , 0 ],
    [ 3 , 0 ],
    [ 4 , 0 ],
    [ 5 , 1.5],
    [ 6 , 2 ],
    [ 7 , 2.75],
    [ 8 , 3.5 ],
    [ 9 , 4 ],
    [ 10 , 4.5 ],
    [ 11 , 5 ],
    [ 12 , 5.5 ],
    [ 13 , 5.75 ],
    [ 14 , 6 ],
    [ 15 , 6.25 ],
    [ 16 , 6.5 ],
    [ 17 , 6.65 ],
    [ 18 , 6.8 ],
    [ 19 , 6.9],
    [ 20 , 7 ],
    [ 21 , 7.10 ],
    [ 22 , 7.20 ],
    [ 23 , 7.25 ]
];


// var testdata = [
// [0 ,  0.3114525280390794],
// [1 ,  0.3114525280390794],
// [2 ,  10.949671641027079],
// [3 ,  0],
// [4 ,  0],
// [5 ,  0],
// [6 ,  0],
// [7 ,  0],
// [8 ,  0]];





document.addEventListener("deviceready", onDeviceReady, false);
// document.addEventListener("touchstart", function() {}, false);


function onDeviceReady() {
  console.log("device is ready in helper");
    
}

function getArray(){
    testdata=receivingArray('strArr');
}

function prep_test_data(){
    //_fromStartPoint= _fromStartPoint ? false: true;
    _correct = _correct ? false: true;
    testdata= _correct ? wrongdata:correctdata;
    var temp = testdata;
    reset();
    testdata = temp;
    console.log(testdata)
    var c_point = new point(testdata[0][0],testdata[0][1]);

    for (var i = 1;i< testdata.length;i++) {

        var a_point = new point(testdata[i][0],testdata[i][1]);
        var b_point = new point(testdata[i-1][0],testdata[i-1][1]);
        
        addDataToChart(a_point,b_point);
        // checkPoint(b_point,a_point,c_point);
    };
}

function load_test_data(){
    for (var i = 1;i< testdata.length;i++) {
        var a_point = testdata[i];
        var b_point =    testdata[i-1];
        checkPoint(b_point,a_point,testdata[0]);
    };
}


function tryEmail(){
    console.log("tryEmail called");

    /* Drew, we need to delete these receive calls and just set from global var noted in index */
    var _body = receiverString('body');
    var userinfo = receiverString('userinfo').split(/~/);
    var attachment;

    console.log("userinfo:",userinfo);
    console.log("_body:",_body);
    console.log("userinfo[0]:",userinfo[0]);
    console.log("userinfo[1]:",userinfo[1]);
    console.log("userinfo[2]:",userinfo[2]);

    if (!logOb) { 
        console.log("no log ob");
    }else{
        attachment = logOb.nativeURL;
    }

    cordova.plugins.email.isAvailable(
    function (isAvailable) {
        
        cordova.plugins.email.open({
            to:      userinfo[2],
            cc:      userinfo[1],
            bcc:     [],
            subject: 'Chart data from '+userinfo[0],
            body:    _body,
            attachments: [attachment]
        });
    }
);
}

/* Just leaving for referance*/
// function tryEmail(){
//     console.log("tryEmail called");

//     /* Drew, we need to delete this receive calls and just set from global var noted in index */
//     // var _body = receiverString('body');
//     var _body = "lasef"
//     var userinfo = receiverString('userinfo').split(/~/);
//     var attachment;

//     console.log("userinfo:",userinfo);
//     console.log("_body:",_body);
//     console.log("userinfo[0]:",userinfo[0]);
//     console.log("userinfo[1]:",userinfo[1]);
//     console.log("userinfo[2]:",userinfo[2]);
//     console.log("logOb.nativeURL: ",logOb.nativeURL);

//     if (!logOb) { 
//         console.log("no log ob");
//     }else{
//         attachment = logOb.nativeURL;
//     }

//     cordova.plugins.email.isAvailable(
//     function (isAvailable) {


//         cordova.plugins.email.open({
//                     to:          ['wescratty@gmail.com'],
//                     cc:          [],
//                     bcc:         [],
//                     attachments: [attachment],
//                     subject:     'EmailComposer plugin test',
//                     body:        '<h2>Hello!</h2>This is a nice <strong>HTML</strong> email with one attachments.',
//                     isHtml:      true
//                 })
        
//         // cordova.plugins.email.open({
//         //     to:      "userinfo[2]",
//         //     cc:      "userinfo[1]",
//         //     bcc:     [],
//         //     subject: 'Chart data from '+"userinfo[0]",
//         //     body:    "_body",
//         //     attachments: attachment
//         // });
//     }
// );
// }







