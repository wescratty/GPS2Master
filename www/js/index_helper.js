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
var receiver_email;
var user_email;
var user_password;
var first_name;
var last_name;
var img_url;
var max = 0;

var hideStart = false;
var hideStop = true;
var _fromStartPoint = false;
var fileSelector = false;
var goodPoint = false;
var currentLoc;
var lastLoc = new Point(0,0);
var needsStarted = true;
var accuracy_high = true;

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

    [ 0 ,  0 ],
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

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
  // console.log("device is ready in helper");
}

function prep_test_data(){
    // _fromStartPoint= !_fromStartPoint;
    var temp = testdata;
    reset();
    testdata = temp;
    var c_point = new Point(testdata[0][0],testdata[0][1]);

    for (var i = 1;i< testdata.length;i++) {

        var a_point = new Point(testdata[i][0],testdata[i][1]);
        var b_point = new Point(testdata[i-1][0],testdata[i-1][1]);
        
        addDataToChart(b_point,b_point);
        // checkPoint(b_point,a_point,c_point);
    }
}

// function load_test_data(){
//     for (var i = 1;i< testdata.length;i++) {
//         var a_point = testdata[i];
//         var b_point =    testdata[i-1];
//         checkPoint(b_point,a_point,testdata[0]);
//     }
// }

function set_fromStartPoint_true(){

    _fromStartPoint = true;
}
function set_fromStartPoint_false(){
    // alert("false");
    _fromStartPoint = false;
}
function tryEmail() {

    /* TODO Drew, we need to get user email from sign in */

    var email;
    var attachment = logOb.nativeURL;
    var first;
    var last;
    var teacher_email;


    if (receiver_email !== "" || receiver_email !== null) {
        teacher_email = receiver_email;
    } else {
        teacher_email = "doranillich@gmail.com";
    }
    if (first_name !== "" || first_name !== null) {
        first = first_name;
    } else {
        first = "Unknown";
    }
    if (last_name !== "" || last_name !== null) {
        last = last_name;
    } else {
        last = "Unknown";
    }
    if (user_email !== "" || user_email !== null) {
        email = user_email;
    } else {
        email = "Unknown";
    }
    if (img_url !== "" || img_url !== null) {
        var str = "Google Map";
        var result = str.link(img_url);
        var _body = result;
    } else {
        var _body = "";
    }

    var _subject = 'Chart data from ' + first + ' ' + last;



    if (!logOb) {
        show_dialoge("You havent made a file yet. Please conseider returning to graph and pressing start. Then go to expoert and save data.");
        attachment = "";
    } else {
        attachment = logOb.nativeURL;
    }

    if (device.platform == "browser") {
        console.log("in email");
        // window.location.href = "mailto:" + teacher_email+"?subject="+img_url;
        window.location="https://mail.google.com/mail?view=cm&tf=0"+teacher_email+"&su"+_subject+"&body"+_body;
    } else{

        cordova.plugins.email.isAvailable(
            function () {

                cordova.plugins.email.open({
                    to: teacher_email,
                    cc: email,
                    bcc: [],
                    subject: _subject,
                    body: _body,
                    attachments: [attachment]
                });
            }
        );
}
}






