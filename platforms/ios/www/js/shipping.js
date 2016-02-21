// ------- global set up to pass data between windows  ----------

// include script in html that is receiving or sending
//           <script src="js/shipping.js"></script>

// ------- Usage example for an array: 

// ------- send:  before leaving window -------
// in the button that leaves the window create a function such as passToTableView() 
// that is called before goTo...
// <button class="SBP"style="background-color:rgb(0, 153, 204)"onclick="passToTableView();goToTableView()">Export</button>



// shipper(String packageName, Array package)

// example: shipper('distancePoints',distancePoints);


// -------- get: in next window in deviceready():

// distancePoints=receiving('distancePoints');

    



function shipper(packageName,package){
  this.packageName = packageName;
  this.package = package;
  console.log("packageName = "+this.packageName+"   \npackage = "+this.package);
    var bag = tag(this.packageName,this.package);
    passData(bag);
}

function receiverString(strng){
  this.strng = strng;
  if(!localStorage.getItem(this.strng)) {
  console.log("no storage");
  return null;
} else {
  // gets JSON from local storage. This seems contrived but its the only way I was able to make it work.
  var str = JSON.parse(localStorage[this.strng]);
  return str;
}

}

function receivingArray(obName){
  this.obName = obName;
  if(!localStorage.getItem(this.obName)) {
  console.log("no storage");
  return null;
} else {
  
  // gets JSON from local storage. This seems contrived but its the only way I was able to make it work.
  var dp = JSON.parse(localStorage[this.obName]);
  console.log(dp);
  var tempArr = [];
for (var i = 0; i < dp.length; i++) {
  // pushes points and rebuilds array
  tempArr.push(new point(dp[i].x,dp[i].y));
  
}
return tempArr;
}
// for some reason JSON turns it into a dictionary
// loads it back to an array of points


}




function passData(bagTag_ClassOb){
  this.bagTag_ClassOb = bagTag_ClassOb;
var storage = window['localStorage'];

storage[this.bagTag_ClassOb.getName()] = JSON.stringify(this.bagTag_ClassOb.getPackage());
// receivingArray('distancePoints');
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

  
