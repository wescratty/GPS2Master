// globa vars 
var refreshIntervalId = null;
var myLiveChart;

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

var startTime;
var count = 0;
var time = 0;

var total_distance;
var lineChart;
var canvas;
var ctx;
var logOb;
var _setLocation = false;
var fileSelector = false;
const METERTOFEET = 3.28084;
const K_MILL_SEC = 1000;


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
[ 0 ,  3 ],
[ 1 ,  6 ],
[ 2 ,  9 ],
[ 3 ,  12 ],
[ 4 ,  15 ],
[ 5,  18 ],
[ 6 ,  21 ],
[ 7 ,  8 ],
[ 8 ,  0 ],
[ 9 ,  0 ],
[ 10 ,  0 ],
[ 11 ,  0 ],
[ 12 ,  0 ],
[ 13 ,  0 ]
                ];



document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("touchstart", function() {}, false);


function onDeviceReady() {
  console.log("device is ready in helper");
    
    
    
    

   
    
}


function startLocationPoints(){
    
    if (refreshIntervalId == null){
        refreshIntervalId = setInterval(getNew, K_MILL_SEC);
    }else{
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}

function load_test_data(){



    for (var i = 0;i< testdata.length;i++) {
        var temp_arr = testdata[i];
        var a_point = new point(temp_arr[0],temp_arr[1])
        
        addDataToChart(a_point);
        
    };
}


function tryEmail(){
    var _body = receiverString('body');
    var userinfo = receiverString('userinfo').split(/~/);
    var attachment;

    if (!logOb) {
        // attachment = image 
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







