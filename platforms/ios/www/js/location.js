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
    getNew();
    }else{
        _setLocation = false;
    }
}

function getNew(){
    console.log("getting new");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}



function onSuccess(position) {
    if (_setLocation&&!goodPoint) {
        console.log("!goodPoint");
        
        // while(!goodPoint){
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
                console.log("We have a lock on your position! "+ax_bx);
                goodPoint = true;
                alert("We have a lock on your position!");
                startPoss = currentLoc;
                startLocationPoints();
            }else{
                console.log(ax_bx);
                lastLoc = currentLoc;
                if (needsStarted) {
                    needsStarted = false;
                    startLocationPoints();

                }
                
            }
        // }
        
        

    }else{
   
        buildLatLonPoints(getGeoPosition(position));
        var len = coorPoints.length;
        if (len>1) {
            var dis_point = new point(time, coorPoints_to_distance(len-1));
            addDataToChart(dis_point);
        };
    }

}




function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}







function buildLatLonPoints(aPoint){
    this.aPoint = aPoint;
    coorPoints.push(aPoint);
    
}

function coorPoints_to_distance (index) {
    this.index  = index;
    var point_a = coorPoints[this.index].info();  //last point in array
    var point_b = coorPoints[this.index-1].info();// second to last point
    
    //creates a point that is the distance covered
    var temp_dis = getDistanceFromLatLonInKm(point_a[0],point_a[1],point_b[0],point_b[1]); 
    
    return temp_dis;
}
function kiloToMile(temp_dis){
    return temp_dis*KILOTOMILE;

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
