function getGeoPosition(position){
  //if failure increment time and retry to get position and do not return until
  // look at chart.js to input to x
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    return new point(lat,lon);
    
}


function setLocation(){
    if (!_setLocation) {
    _setLocation = true;
    startLocationPoints();
    }else{
        _setLocation = false;
    }
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
            var ax_bx = a_x -b_x;
            var ay_by = a_y -b_y;


            if (ax_bx==0&&ay_by==0 ) {
                goodPoint = true;
                alert("We have a lock on your position!");
                startPoss = currentLoc;
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
        
        if (len < 1) {
            buildLatLonPoints(getGeoPosition(position));

        }else{
            currentLoc = getGeoPosition(position);
            var a_point = currentLoc.info();
            var b_point = coorPoints[len-1].info();
            var temp_dis = getDistanceFromLatLonInKm(a_point[0],a_point[1],b_point[0],b_point[1]);
         

            if (!modeOfTrans(mode,temp_dis)) {
                console.log(temp_dis);
                  return;// were we need to add a point or something
            }else{
                buildLatLonPoints(currentLoc);
                
                var dis_point = new point(time, temp_dis);
                addDataToChart(dis_point);
            }
        }// end inner else if
    // }// end iff
    }// end outer else if

}


function coorDist(now,then) {
    
    var point_a = now.info();  //last point 
    var point_b = then.info();// second to last point
    
    //creates a point that is the distance covered
    var temp_dis = getDistanceFromLatLonInKm(point_a[0],point_a[1],point_b[0],point_b[1]); 
    
    return temp_dis;
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}







function buildLatLonPoints(aPoint){
    this.aPoint = aPoint;
    coorPoints.push(this.aPoint);
    
}

function coorPoints_to_distance (index) {
    this.index  = index;
    var point_a = coorPoints[this.index].info();  //last point in array
    var point_b = coorPoints[this.index-1].info();// second to last point
    
    //creates a point that is the distance covered
    var temp_dis = getDistanceFromLatLonInKm(point_a[0],point_a[1],point_b[0],point_b[1]); 
    
    return temp_dis;
}



function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d*KILOMETERTOFEET;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}


function point(x,y){
    this.y = y;
    this.x = x;
    this.info = function(){
        return [this.x,this.y];
    }
}

function modeOfTrans(mode,dist){
    var tolerance;
    if (mode =="walk") {
        tolerance = 20;
    }else if (mode =="bike") {
        tolerance = 100;
    }else if (mode =="auto") {
        tolerance = 1000;
    }
     
    

    if(dist<tolerance) {
        return true;
    }else{
        return false;
    }
}

function twoPointArr(aPoint,bPoint){
    this.a_point = a_point.info();
    this.b_point = b_point.info();
    
    return [this.a_point[0],this.a_point[1],this.b_point[0],this.b_point[1]];
}
