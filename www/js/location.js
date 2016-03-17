function getGeoPosition(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(" lat: "+ lat+ " lon: "+ lon);
    return new Point(lat,lon);
}

function toggle_startp_lastp(){
    console.log("coorPoints.length: "+coorPoints.length);
    if(coorPoints.length>0){
        transferingData = true;
        transferData();
        console.log("Transfering data");
    }
}

function transferData(){
        var tempArr = _fromStartPoint ? coorPoints : testdata;
        reset();
        testdata = tempArr;
        load_test_data();
}

function getNew(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function startLocationPoints(){
    
    if (refreshIntervalId == null){
        refreshIntervalId = setInterval(getNew, K_MILL_SEC);
    }else{
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
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
            // console.log("ax_bx: "+ax_bx);
            // console.log("ay_by: "+ay_by);
            if (ax_bx<5&&ay_by<5 ) {
                goodPoint = true;
                alert("We have a lock on your position!");

                buildLatLonPoints(currentLoc);
                currentLoc = un;
            }else{
                lastLoc = currentLoc;
            }
            return goodPoint;
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

function checkPoint(now,then,start){
    var a_point = now.info();  
    var b_point = then.info();
    var c_point = start.info();
    var temp_dis = getDistanceFromLatLonInKm(a_point[0],a_point[1],b_point[0],b_point[1]);
    var disFromStart = getDistanceFromLatLonInKm(a_point[0],a_point[1],c_point[0],c_point[1]);

    if (modeOfTrans(mode, temp_dis)) {
        console.log("good to go");
        buildLatLonPoints(now);
        var last_point = new Point(time, temp_dis);
        var start_point = new Point(time, disFromStart);
        addDataToChart(last_point, start_point); // only access to add data
    } else console.log(temp_dis);
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
    console.log("mode,dist:", mode,dist);
    var tolerance;
    if (mode =="walk") {
        tolerance = 20;
    }else if (mode =="bike") {
        tolerance = 100;
    }else if (mode =="drive") {
        tolerance = 10000;  // Thsi is too high but have the 7000 problem 
    }
     var iss = dist<tolerance;
    console.log(iss);

    return iss;
}


