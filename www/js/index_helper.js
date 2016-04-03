// globa vars 


// sort these as find or delete if not used
var non_lat_long_Points = [];
var drawArray = [];
var hideStart = false;
var hideStop = true;
var fileSelector = false;
var needsStarted = true;
var transferingData = false;
var alertDialog;



// graph
var dataOutArray = [];
var pointsArray = [];
var distancePoints = [];
var accelerationPoints = [];
var positionPoints = [];
var ratePoints = [];
var distance = [];
var rate = [];
var acceleration = [];
var total_distance;
var lineChart;
var canvas;
var ctx;
var startTime;
var count = 0;
var time = 0;
var un;// used to reset things

var max = 0;

var _fromStartPoint = false;

// export
var file_entries;
var indexId;
var setAction;

// index

// index_helper
var img_url;

// io
var logOb;
var fileName;
var fileApp;
var directory;
var fs;

// location
var coorPoints = [];
var refreshIntervalId = null;
var startPoss;
var goodPoint = false;
var accuracy_high = true;
var currentLoc;
var lastLoc = new Point(0,0);
const K_MILL_SEC = 1000;
var mode = "drive";


// login
var first_name;
var last_name;
var receiver_email;
var user_email;


// settings
var _autoZoom = true;
var currentZoom = 0;
var customZoom = 0;

// sliding menu

// tabel

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
        /* TODO: once test data is lat lon point send through checkpoint instead of addDataTochart*/
        // checkPoint(b_point,a_point,c_point);
    }
}








