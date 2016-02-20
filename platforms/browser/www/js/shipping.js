// ------- global set up to pass data between windows  ----------

// ------- Usage example for an array: 

// ------- send:  before leaving window -------
// shipper(String packageName, Array package)

// example: shipper('distancePoints',distancePoints);


// -------- get: in next window in deviceready():

// distancePoints=receiving('distancePoints');

    



function shipper(packageName,package){
    var package = tag('packageName',packageName);
    passData(package);
}

function receiving(obName){
  this.obName = obName;
  if(!localStorage.getItem(this.obName)) {
  console.log("no storage");
} else {
  // gets JSON from local storage. This seems contrived but its the only way I was able to make it work.
  var dp = JSON.parse(localStorage[this.obName]);
}
// for some reason JSON turns it into a dictionary
// loads it back to an array of points
var tempArr = [];
for (var i = 0; i < dp.length; i++) {
  // pushes points and rebuilds array
  tempArr.push(new point(dp[i].x,dp[i].y));
  
}
return tempArr;

}




function passData(bagTag_ClassOb){
  this.bagTag_ClassOb = bagTag_ClassOb;
var storage = window['localStorage'];

storage[this.bagTag_ClassOb.getName()] = JSON.stringify(this.bagTag_ClassOb.getPackage());

}

 function tag(tag,bag){
  this.tag = tag;
  this.bag = bag;

  var package_ob = new BagTag(this.tag,this.bag);
  return package_ob;
 }


 //---------- fake class ------------
 var BagTag = function(name, package){
    this.name = name;
    this.package = package;
  };

  BagTag.prototype.getName = function(){
    return this.name;
  }

  BagTag.prototype.getPackage = function(){
    return this.package;
  }

  
