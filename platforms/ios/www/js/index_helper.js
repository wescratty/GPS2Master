
var refreshIntervalId = null;
var myLiveChart;
var dataOutArray = [];
var pointsArray = [];
var startTime;
var count = 0;
var time = 0;

var coorPoints = [];
var non_lat_long_Points = [];
var distancePoints = [];
var accelerationPoints = [];
var positionPoints = [];

var ratePoints = [];
var total_distance = 0;

var lineChart;
var canvas;
var ctx;
var logOb;

var distance = [];
var rate = [];
var acceleration = [];
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
    else if (device.platform == "ios") {
        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        // window.resolveLocalFileSystemURL(cordova.file.applicationDirectory, function (dir) {
        //     console.log("Main Dir ios:", dir);
        //     dir.getFile("data.csv", {create: true}, function (file) {
        //         console.log("File: ", file);
        //         logOb = file;
        //         //writeLog("App started");
        //     });
        // });
    }else if (device.platform == "browser") { 
        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        console.log("Main Dir browser:");
        // window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/index.html", function (dir){


        // // window.resolveLocalFileSystemURL(cordova.file.documentsDirectory, function (dir) {
        //     console.log("Main Dir browser:", dir);
        //     dir.getFile("export.csv", {create: true}, function (file) {
        //         console.log("File: ", file);
        //         logOb = file;
        //         //writeLog("App started");
        //     });
        // });
    }
    
}


   

    // function fail() {
    //     console.log("failed to get filesystem");
    // }

    function gotFS(fileSystem) {
        console.log("got filesystem");

          
        // fileSystem.root.getFile("data.csv", {create: true, exclusive: false}, gotFileEntry, fail);

    }

    // function gotFileEntry(fileEntry) {
    //     fileEntry.file(gotFile, fail);
    // }

    // function gotFile(file){
    //     logOb = file;
    //     // readDataUrl(file);
    //     // readAsText(file);
    // }

    function gotFileEntry(fileEntry) {
        logOb = fileEntry;
        console.log(logOb.fullPath);
        // fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    }

    function fail(error) {
        console.log(error.code);
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
        temp = dat.info()[1]+"~";

    for (var i = 1; i< an_array.length; i++) {
        dat = an_array[i];
        temp = temp+dat.info()[1]+"~";
    }
    
    return temp;
    
}


function loadCSVString(aString){
    var strArr = aString.split(/~/);
    var tempArr = []
    for (var i = 0; i < strArr.length; i++) {
        tempArr[i]= [i,strArr[i]];
    };

    testdata = tempArr;
}



function tryEmail(){

    this.the_message = "some stuff";
    cordova.plugins.email.isAvailable(
    function (isAvailable) {
        // alert('Service is not available') unless isAvailable;
        console.log("logOb.fullPath");
        
        cordova.plugins.email.open({
            to:      'wescratty@gmail.com',
            cc:      '',
            bcc:     [],
            subject: 'Cordova data',
            body:    this.the_message,
            attachments: ['file:/'+logOb.fullPath + "/" + data.csv]
//            .fullPath + "/" + fileName
//             attachments: ['file:/'+logOb.fullPath]
//             attachments: ['file://css/data.csv']
    
        });
    }
);

//     cordova.plugins.email.open({
//     to:      'max@mustermann.de',
//     cc:      'erika@mustermann.de',
//     bcc:     ['john@doe.com', 'jane@doe.com'],
//     subject: 'Greetings',
//     body:    'How are you? Nice greetings from Leipzig',
//     attachments: 'file://resources/data.csv'
// });
    
}





function writeF() {
    if(!logOb) return;
    //var log = str + " [" + (new Date()) + "]\n";
    var text = "Distance"+"%0D%0A"+makeCSVString(distancePoints)+"Velocity"+"%0D%0A"+makeCSVString(ratePoints)+"Acceleration"+"%0D%0A"+makeCSVString(accelerationPoints);
    console.log("Writing to file: "+text);
    logOb.createWriter(function(fileWriter) {

        fileWriter.seek(fileWriter.length);

        var blob = new Blob([text], {type:'text/csv'});
        fileWriter.write(blob);
        console.log("Finished writing");
    }, fail);
}

function readF() {
    logOb.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            console.log(this.result);
        };

        reader.readAsText(file);

        var notificationBox = document.getElementById("result");
    notificationBox.textContent = reader.readAsText(file);
    }, fail);
}

function deleteF() {
/*    if(!logOb) return;
    logOb.createWriter(function(fileWriter) {
        fileWriter.seek(fileWriter.length);
        var blob = new Blob("", {type:'text/csv'});
        fileWriter.write(blob);
        console.log("Finished deleting");
    }, fail);*/
    logOb.clearData();
}
/*
function emailMessage() {
    console.log(logOb.nativeURL)
    window.plugin.email.open({
        to:      ['andrew.maclean@umontana.edu'],
        subject: 'atty',
        body:    'log file',
    });
}*/














function FileApp() {
}

FileApp.prototype = {
fileSystemHelper: null,
fileNameField: "data.csv",
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
    console.log(fileName);


    
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

// function sendCSV(){
//     var anArray = distancePoints;
    
    
//     // var data = $.parseJSON( txt ).dataOutArray;
    
//     var $table = $( "<table></table>" );
    
//     for ( var i = 0; i < anArray.length; i++ ) {
//         var dat = anArray[i];
//         var $line = $( "<tr></tr>" );
//         $line.append( $( "<td></td>" ).html( dat.info()[0]+", "+dat.info()[1]) );
//         $table.append( $line );
//     }
    
//     $table.appendTo( $( "#tableDiv" ) );
    
    
//     var csvFile = null,
//     makeCsvFile = function (csv) {
//         var data = new Blob([csv], {type: 'csv'});
        
//         // If we are replacing a previously generated file we need to
//         // manually revoke the object URL to avoid memory leaks.
//         if (csvFile !== null) {
//             window.URL.revokeObjectURL(csvFile);
//         }
        
//         csvFile = window.URL.createObjectURL(data);
        
//         return csvFile;
//     };
    
//     // console.log("hi there");
    
//     var dataOut = anArray.join("")
//     var create = document.getElementById('create'),
//     tableVal = document.getElementById('tableDiv');
    
//     create.addEventListener('click', function () {
//                             var link = document.getElementById('downloadlink');
//                             link.href = makeCsvFile(makeCSVString(distancePoints));
                            
//                             link.style.display = 'table';
//                             }, false);
    
    
    
    
    
//     // var snd = new Audio("/resources/notify.wav"); // buffers automatically when created
//     // snd.play();
// }








