var mockLocationArray = [];
loadGoodMockDataToArray();

function loadGoodMockDataToArray() {
    // console.log("mocking good data");
    mockLocationArray = [
        0,0.1,0.2,0.3,0.4,0.5, // get the array started
        3.010299957,
        4.771212547,
        6.020599913,
        6.989700043,
        7.781512504,
        8.4509804,
        9.03089987,
        9.542425094,
        10,
        10.41392685,
        10.79181246,
        11.13943352,
        11.46128036,
        11.76091259,
        12.04119983,
        12.30448921
    ];
    mockLocationArray.reverse();
}

function loadBadMockDataToArray() {
    // console.log("mocking bad data");
    mockLocationArray = [
        0,0.1,0.2,0.3,0.4,0.5, // get the array started
        3.010299957,
        4.771212547,
        6.020599913,
        6.989700043,
        7.781512504,
        8.4509804,
        9.03089987,
        9.542425094,
        10,
        10.41392685,
        10.79181246,
        11.13943352,
        11.46128036,
        11.76091259,
        12.04119983,
        12.30448921
    ];
}

// function toggle_startp_lastp(){
//     console.log("coorPoints.length: "+coorPoints.length);
//     if(coorPoints.length>0){
//         transferingData = true;
//         transferData();
//         console.log("Transfering data");
//     }
// }
//
// function transferData(){
//     var tempArr = _fromStartPoint ? coorPoints : testdata;
//     reset();
//     testdata = tempArr;
//     load_test_data();
// }

function startLocationPoints(){
    // show_dialoge("Connecting...");


    if (refreshIntervalId == null){
        refreshIntervalId = setInterval(getNew, K_MILL_SEC);
    }else{
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}

function getNew(){
    navigator.geolocation.getCurrentPosition(onSuccess, errorCallback_highAccuracy,{maximumAge:600000, timeout:5000, enableHighAccuracy: accuracy_high});
}

function onSuccess(position) {
    if (!goodPoint) {
        locationLock(position);

    }else{

        var len = coorPoints.length;
        currentLoc = getGeoPosition(position);
        checkPoint(currentLoc,coorPoints[len-1],coorPoints[0]);
    }
}

function getGeoPosition(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    // var loc = mockLocationArray.pop();
    // var lat = loc / 500000; // GPS lat conversion factor
    // var lon = 0.0
    // console.log(" lat: "+ lat+ " lon: "+ lon);
    // console.log(position.coords.accuracy+"m");
    return new Point(lat,lon);
}

function checkPoint(now,then,start){
    var a_point = now.info();
    var b_point = then.info();
    var c_point = start.info();
    var temp_dis = getDistanceFromLatLonInKm(a_point[0],a_point[1],b_point[0],b_point[1]);
    var disFromStart = getDistanceFromLatLonInKm(a_point[0],a_point[1],c_point[0],c_point[1]);

    if (modeOfTrans(mode, temp_dis)) {
        // console.log("good to go");
        buildLatLonPoints(now);
        var last_point = new Point(time, temp_dis);
        var start_point = new Point(time, disFromStart);
        addDataToChart(last_point, start_point); // only access to add data
    } else console.log(temp_dis);
}

function locationLock(position){
    currentLoc=getGeoPosition(position);
    var a_point = currentLoc.info();
    var b_point = lastLoc.info();
    var a_x = a_point[0];
    var a_y = a_point[1];
    var b_x = b_point[0];
    var b_y = b_point[1];
    var ax_bx = Math.abs(a_x -b_x);
    var ay_by = Math.abs(a_y -b_y);
    // console.log("ax_bx: "+ax_bx);
    // console.log("ay_by: "+ay_by);
    if (ax_bx<5&&ay_by<5 ) {
        goodPoint = true;
        modal.hide();
        buildLatLonPoints(currentLoc);
        currentLoc = un;
    }else{
        lastLoc = currentLoc;
    }
    return goodPoint;
}





function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}


function buildLatLonPoints(aPoint){
    this.aPoint = aPoint;
    coorPoints.push(this.aPoint);

}



function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist*5280
}

function Point(x, y){
    this.y = y;
    this.x = x;
    this.info = function(){
        return [this.x,this.y];
    }
}

function modeOfTrans(mode,dist){
    // console.log("mode,dist:", mode,dist);
    var tolerance;
    if (mode =="walk") {
        tolerance = 20;
    }else if (mode =="bike") {
        tolerance = 100;
    }else if (mode =="drive") {
        tolerance = 10000;  // Thsi is too high but have the 7000 problem 
    }
    var iss = dist<tolerance;
    // console.log(iss);

    return iss;
}

function show_dialoge(mess) {


    ons.createAlertDialog('alert.html').then(function(alertDialog) {
        alertDialog.show();
    });

    // ons.notification.alert({
    //     message: mess,
    //     modifier: true ? 'material' : undefined
    // });
}
function destroy_dialoge() {

    alertDialog.destroy();
}

function errorCallback_highAccuracy(error) {
    accuracy_high = false;
    console.log(error)
    if (error.code == error.TIMEOUT)
    {
        // Attempt to get GPS loc timed out after 5 seconds, modal
        // try low accuracy location
        // $('ons-modal').append("attempting to get low accuracy location");
        $('#modalMessage').append("\<br> Switching to low accuracy location...");
        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback_lowAccuracy,
            {maximumAge:600000, timeout:10000, enableHighAccuracy: accuracy_high});
        return;
    }

    var msg = "<p>Can't get your location. Reason = ";
    if (error.code == 1) {
        msg += "PERMISSION_DENIED";
        
    }else if (error.code == 2){
        msg += "POSITION_UNAVAILABLE";
    msg += ", msg = " + error.message;
    }else{
        msg += "UNKNOWN. Try moving to a more open area.";
    }

    setTimeout(function(){

        modal.hide();



    }, 2000);
    startLocationPoints();
    $('#modalMessage').append(msg);


}


//found this, I think we should integrate the error handling.

/*navigator.geolocation.getCurrentPosition(
 successCallback,
 errorCallback_highAccuracy,
 {maximumAge:600000, timeout:5000, enableHighAccuracy: true}

 );

 function errorCallback_highAccuracy(position) {
 if (error.code == error.TIMEOUT)
 {
 // Attempt to get GPS loc timed out after 5 seconds,
 // try low accuracy location
 $('body').append("attempting to get low accuracy location");
 navigator.geolocation.getCurrentPosition(
 successCallback,
 errorCallback_lowAccuracy,
 {maximumAge:600000, timeout:10000, enableHighAccuracy: false});
 return;
 }

 var msg = "<p>Can't get your location (high accuracy attempt). Error = ";
 if (error.code == 1)
 msg += "PERMISSION_DENIED";
 else if (error.code == 2)
 msg += "POSITION_UNAVAILABLE";
 msg += ", msg = "+error.message;

 $('body').append(msg);
 }

 function errorCallback_lowAccuracy(position) {
 var msg = "<p>Can't get your location (low accuracy attempt). Error = ";
 if (error.code == 1)
 msg += "PERMISSION_DENIED";
 else if (error.code == 2)
 msg += "POSITION_UNAVAILABLE";
 else if (error.code == 3)
 msg += "TIMEOUT";
 msg += ", msg = "+error.message;

 $('body').append(msg);
 }

 function successCallback(position) {
 var latitude = position.coords.latitude;
 var longitude = position.coords.longitude;
 $('body').append("<p>Your location is: " + latitude + "," + longitude+" </p><p>Accuracy="+position.coords.accuracy+"m");
 }*/