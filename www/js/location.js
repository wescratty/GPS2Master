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
    navigator.geolocation.getCurrentPosition(onSuccess, errorCallback_highAccuracy,{maximumAge:1000,timeout:5000, enableHighAccuracy: accuracy_high});
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

    // for mock data, may be removed after testing?
    // var loc = mockLocationArray.pop();
    // var lat = loc / 500000; // GPS lat conversion factor
    // var lon = 0.0
//    console.log(" lat: "+ lat+ " lon: "+ lon);
//    console.log(position.coords.accuracy+"m");
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
    } else{
        console.log("dist> tolerance");
        console.log("temp_dis: ",temp_dis);
    }
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
    if (ax_bx==0&&ay_by==0 ) {
        console.log("ay_by: ",ay_by,"\n ax_bx: ",ax_bx);
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
        tolerance = 1000000;  // Thsi is too high but have the 7000 problem
    }
    var iss = dist<tolerance;
    console.log("mode: ",mode);

    return iss;
}

/* Can use instead of alert(), makes a iOS style alert */
function show_dialoge(mess) {
    
    ons.notification.alert({
        message: mess
    });
}

// need to add load function
//function show_choice(mess,caller) {
//    if(!alertArgs[caller]){
//    ons.notification.confirm({
//        message: mess
//    callback: function(answer) {
//          if(answer ==  true){
//             alertArgs[caller]=1;
//          }
//        }
//      });
//    }
//}


// ons.notification.confirm({
//    message: 'Are you ready?'
//    callback: function(answer) {
//      // Do something here.
//    }
//  });

function errorCallback_highAccuracy(error) {
    accuracy_high = false;
    console.log(error)
    if (error.code == error.TIMEOUT)
    {
        $('#modalMessage').append("<br> Switching to low accuracy location...");
        navigator.geolocation.getCurrentPosition(
            onSuccess,
            errorCallback_lowAccuracy,
            {maximumAge:600000, timeout:6000, enableHighAccuracy: accuracy_high});
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

function errorCallback_lowAccuracy(error) {
    var msg = "<p>Can't get your location (low accuracy attempt). Error = ";
    if (error.code == 1)
        msg += "PERMISSION_DENIED";
    else if (error.code == 2)
        msg += "POSITION_UNAVAILABLE";
    else if (error.code == 3)
        msg += "TIMEOUT";
    msg += ", msg = "+error.message;

    setTimeout(function(){
        modal.hide();
    }, 2000);
    startLocationPoints();
    $('#modalMessage').append(msg);
}

function showPosition(position) {
    img_url = makeImgUrl();

    if(img_url){
        document.getElementById("result").innerHTML = "<img src='"+img_url+"'>";
    }else{
        show_dialoge("You have no location points yet!");
    }

}

function makeImgUrl(){
  // var latlon1 = coorPoints[0].info()[0] + "," + coorPoints[0].info()[1];
    // var latlon2 = coorPoints[1].info()[0] + "," + coorPoints[1].info()[1];

    if(coorPoints.length<1){
    return false;
    }else{

    var latlonStr = "|"+coorPoints[0].info()[0] + "," + coorPoints[0].info()[1];

    for(var i =1;i<coorPoints.length;i++){
        if(coorPoints[i].info()[0]!==coorPoints[i-1].info()[0]&&coorPoints[i].info()[1]!==coorPoints[i-1].info()[1]){
            latlonStr=latlonStr+ "|"+coorPoints[i].info()[0] + "," + coorPoints[i].info()[1];
        }

    }
    var meanPoint = findMeanLatLon();
    console.log(meanPoint);

    img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
        +meanPoint+"&zoom="+getZoom()+"&size=320x320&maptype=satellite&markers=size:tiny|color:red"+latlonStr+"&sensor=false";
        return img_url;
        }

}

function findMeanLatLon() {
    var latsum = coorPoints[0].info()[0];
    var longsum = coorPoints[0].info()[1];
    var i =1;
    var index=1;

    for(i;i<coorPoints.length;i++){
        if(coorPoints[i].info()[0]!==coorPoints[i-1].info()[0]&&coorPoints[i].info()[1]!==coorPoints[i-1].info()[1]){
            latsum=latsum+ coorPoints[i].info()[0];
            longsum=longsum+ coorPoints[i].info()[1];
            index++;
        }

    }

    latsum=latsum/index;
    longsum=longsum/index;
    console.log("index: ",index);

    return latsum + "," + longsum;

}

function getZoom() {
    var zoom;
    console.log("max: ",max);
    
    if(_autoZoom) {
        if (max < 500) {
            zoom = 18;
        } else if (max < 1000) {
            zoom = 17;
        } else if (max < 2000) {
            zoom = 16;
        } else if (max < 3000) {
            zoom = 15;
        } else if (max < 4000) {
            zoom = 14;
        } else if (max < 5000) {
            zoom = 13;
        } else if (max < 6000) {
            zoom = 12;
        } else if (max < 7000) {
            zoom = 11;
        } else if (max < 8000) {
            zoom = 10;
        } else if (max < 9000) {
            zoom = 9;
        } else {
            zoom = 8;
        }
    }else{
        zoom = customZoom;
    }
    currentZoom =zoom;
    console.log("zoom: ",zoom);
    return zoom;

}

function set_fromStartPoint_true(){

    _fromStartPoint = true;
}
function set_fromStartPoint_false(){

    _fromStartPoint = false;
}





















