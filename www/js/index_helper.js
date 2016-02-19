
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


// this is x^3
var testdata = [
[ 0 ,  0 ],
[ 1 ,  0.258819 ],
[ 2 ,  0.5 ],
[ 3 ,  0.7071068 ],
[ 4 ,  0.8660254 ],
[ 5 ,  0.9659258 ],
[ 6 ,  1 ],
[ 7 ,  0.9659258 ],
[ 8 ,  0.8660254 ],
[ 9 ,  0.7071068 ],
[ 10 ,  0.5 ],
[ 11 ,  0.258819 ],
[ 12 ,  0.0 ],
[ 13 ,  -0.258819 ],
[ 14 ,  -0.5 ],
[ 15 ,  -0.7071068 ],
[ 16 ,  -0.8660254 ],
[ 17 ,  -0.9659258 ],
[ 18 ,  -1 ],
[ 19 ,  -0.9659258 ],
[ 20 ,  -0.8660254 ],
[ 21 ,  -0.7071068 ],
[ 22 ,  -0.5 ],
[ 23 ,  -0.258819 ],
[ 24 ,  0.0 ]
                ];


const METERTOFEET = 3.28084;
const K_MILL_SEC = 1000;



document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("touchstart", function() {}, false);


function onDeviceReady() {
  console.log("device is ready in helper");
    
    createGraph();
    
    var fileApp = new FileApp();
    fileApp.run();
console.log(device.platform);
    console.log(device.platform);
     if (device.platform == "Android") {
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
            console.log("Main Dir android:", dir);
            dir.getFile("export.csv", {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
                //writeLog("App started");
            });
        });
    }
    else if (device.platform == "iOS") {
       
            window.resolveLocalFileSystemURL(cordova.file.documentsDirectory, function (dir) {
            console.log("Main Dir:", dir);
            dir.getFile("data.csv", {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
                //writeLog("App started");
            });
        });
    
    }else if (device.platform == "browser") {
      //     window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL ||
      //                                window.webkitResolveLocalFileSystemURL;

  
    
      // window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
      //       console.log("Main Dir:", dir);
      //       dir.getFile("data.csv", {create: true}, function (file) {
      //           console.log("File: ", file);
      //           logOb = file;
      //           //writeLog("App started");
      //       });
      //   });
        
    }
    
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

// how to change a point

    // console.log(dv_dt(new point(3,20),new point(0,0)));
    //  console.log("\n");
    // console.log(dv_dt(new point(6,33),new point(3,20)));
    // console.log("\n");
    // console.log(dv_dt(new point(9,43),new point(6,33)));

    for (var i = 0;i< testdata.length;i++) {
        var temp_arr = testdata[i];
        var a_point = new point(temp_arr[0],temp_arr[1])
        
        addDataToChart(a_point);
        
    };
}

function setLocation(){
    _setLocation = true;
}

function getNew(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}



function onSuccess(position) {
   

    buildLatLonPoints(getGeoPosition(position));
    var len = coorPoints.length;
    if (len>1) {
        var dis_point = new point(time, coorPoints_to_distance(len-1));
        addDataToChart(dis_point);
    };

}




function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}



function printPointsArray(){
    sessionStorage.setItem('pointsArray', pointsArray);
    
    
    for(var i = 0; i<pointsArray.length;i++){
        var pnt = pointsArray[i];
        document.write(pnt.info()+"<br />");
    }
}


function makeCSVString(an_array){
    var temp ;
    var dat = an_array[0];
        temp = dat.info()+"\r\n";

    for (var i = 1; i< an_array.length; i++) {
        console.log(an_array.length);
        dat = an_array[i];
        temp = temp+dat.info()+"\r\n";
    }
    
    return temp;
    
}


function loadCSVString(aString){
    var strArr = aString.split(/\n/);
    testdata = [];
    var tempArr = []
    var temp;
    for (var i = 0; i < strArr.length; i++) {
        // console.log(strArr[i]);
        temp= strArr[i].split(/,/);
        console.log(strArr.length);
        tempArr[i]=[parseFloat(temp[0]),parseFloat(temp[1])];
        if (!tempArr[i][0]&&!tempArr[i][1]) {continue};
        console.log(tempArr[i]);
        testdata.push(tempArr[i]);
    };
}



function tryEmail(){
    // console.log(logOb.nativeURL);

    this.the_message = "some stuff";
    cordova.plugins.email.isAvailable(
    function (isAvailable) {
        // alert('Service is not available') unless isAvailable;

        
        cordova.plugins.email.open({
            to:      'wescratty@gmail.com',
            cc:      '',
            bcc:     [],
            subject: 'Cordova data',
            body:    this.the_message,
            attachments: [logOb.nativeURL]
    
        });
    }
);
}



function FileApp() {
}

FileApp.prototype = {
fileSystemHelper: null,
fileNameField: null,
textField: null,
    
run: function() {
    var that = this,
    writeFileButton = document.getElementById("writeFileButton"),
    readFileButton = document.getElementById("readFileButton"),
    deleteFileButton = document.getElementById("deleteFileButton");
    
    that.fileNameField = document.getElementById("fileNameInput");
    that.textField = document.getElementById("textInput");
    
     writeFileButton.addEventListener("click",
                                         function() { 
                                             that._writeTextToFile.call(that);
                                             // writeF();
                                         });
        
        readFileButton.addEventListener("click",
                                        function() {
                                            that._readTextFromFile.call(that);
                                            // readF();
                                        });
        
        deleteFileButton.addEventListener("click",
                                          function() {
                                              that._deleteFile.call(that)
                                              // tryEmail();
                                          });



         emailFileButton.addEventListener("click",
            function() {
                //that._deleteFile.call(that)
                tryEmail();
            });


    fileSystemHelper = new FileSystemHelper();
},
    
_deleteFile: function () {
    var that = this,
    fileName = that.fileNameField.value;
    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.deleteFile(fileName, that._onSuccess, that._onError);
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
_readTextFromFile: function() {
    var that = this,
    fileName = that.fileNameField.value;
    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.readTextFromFile(fileName, that._onSuccess, that._onError);
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
    
    
_writeTextToFile: function() {
    var that = this,
     fileName = that.fileNameField.value,
    text = makeCSVString(distancePoints);
    // text = that.textField.value;
//    console.log(fileName);


    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.writeLine(fileName, text, that._onSuccess, that._onError)
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
_onSuccess: function(value) {
    var notificationBox = document.getElementById("result");
    notificationBox.textContent = value;
},
    
_onError: function(error) {
    
    var errorCodeDiv = document.createElement("div"),
    errorMessageDiv = document.createElement("div"),
    notificationBox = document.getElementById("result");
    
    errorCodeDiv.textContent = "Error code: " + error.name;
    errorMessageDiv.textContent = "Message: " + error.message;
    
    notificationBox.innerHTML = "";
    notificationBox.appendChild(errorCodeDiv);
    notificationBox.appendChild(errorMessageDiv);
},
    
_isValidFileName: function(fileName) {
    //var patternFileName = /^[\w]+\.[\w]{1,5}$/;
    
    return fileName.length > 2;
}
}

