

document.addEventListener('deviceready', function () {

    console.log("device is ready in graph");}, false);

function createGraph() {
    
    var data = {
    datasets: [{
               label: "First",
               fillColor: "rgba(220,220,220,0.2)",
               strokeColor: "rgba(220,20,20,1)",
               pointColor: "rgba(220,20,20,1)",
               pointStrokeColor: "#fff",
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(220,220,220,1)",
               data: [{x : 0,y : 0}]
               },{
               label: "Second",
               fillColor: "rgba(0, 191, 255,0.2)",
               strokeColor: "rgba(0, 191, 255,1)",
               pointColor: "rgba(0, 191, 255,1)",
               pointStrokeColor: "#fff",
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(0, 191, 255,1)",
               data: [{x : 0,y : 0}]
               }, {
               label: "Third",
               fillColor: "rgba(151,187,205,0.2)",
               strokeColor: "rgba(15,187,25,1)",
               pointColor: "rgba(15,187,25,1)",
               pointStrokeColor: "#fff",
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(151,187,205,1)",
               data: [{x : 0,y : 0}]
               }, {
                label: "Forth",
               fillColor: "rgba(255, 255, 0,0.2)",
               strokeColor: "rgba(255, 255, 0,1)",
               pointColor: "rgba(255, 255, 0,1)",
               pointStrokeColor: "#fff",
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(255, 255, 0,1)",
               data: [{x : 0,y : 0}]
               }]
    };
    
    
    var options = {
        // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
        // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value + ' %' %>",pointDotRadius : 1,
    scaleGridLineColor : "#000000",
    scaleFontColor: "#000000"
    };
    
    var ctx = document.getElementById("updating-chart").getContext("2d");
    
    window.lineChart = new Chart(ctx).Scatter(data, options);
    if (!lineChart) {console.log("no line");}
};
    
    
        function pos(){
                        var label = 'First';
                       	  console.log("call " + label);
                        var chart = lineChart;
                        var store = chart.datasets;
                        var finded = false;
			console.log(chart);
                        for (var i = 0; i < store.length; i++) {
                        console.log("Store name " + store[i][0]);
                        if (store[i][0] === label) {
                        finded = true;
                        var restored = store.splice(i, 1)[0][1];
                        chart.datasets.push(restored);
                        }
                        }
                        
                        if (!finded) {
                        console.log('Start search dataset with label = ' + label);
                        for (var i = 0; i < chart.datasets.length; i++) {
                        if (chart.datasets[i].label === label) {
                        chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
                        }
                        }
                        }
                        chart.update();
                        }
    
         function vol(){
                        var label = 'Second';
                       	  console.log("call " + label);
                        var chart = lineChart;
                        var store = chart.datasets;
                        var finded = false;
			console.log(chart);
                        for (var i = 0; i < store.length; i++) {
                        console.log("Store name " + store[i][1]);
                        if (store[i][0] === label) {
                        finded = true;
                        var restored = store.splice(i, 1)[0][1];
                        chart.datasets.push(restored);
                        }
                        }
                        
                        if (!finded) {
                        console.log('Start search dataset with label = ' + label);
                        for (var i = 0; i < chart.datasets.length; i++) {
                        if (chart.datasets[i].label === label) {
                        chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
                        }
                        }
                        }
                        chart.update();
                        }
    
         function acc(){
                          var label = 'Third';
                       	  console.log("call " + label);
                          var chart = lineChart;
                          var store = chart.datasets;
                          var finded = false;
			                   console.log(chart);
                          for (var i = 0; i < store.length; i++) {
                          console.log("Store name " + store[i][2]);
                          if (store[i][0] === label) {
                          finded = true;
			                   chart.datasets[i].pointDot = true;
			                  chart.datasets[i].datasetStroke = true;
			                   console.log("readd data");

                          }
                          }
                          
                          if (!finded) {
                          console.log('Start search dataset with label = ' + label);
                          for (var i = 0; i < chart.datasets.length; i++) {
                          if (chart.datasets[i].label === label) {
			  chart.datasets[i].pointDot = false;
			  chart.datasets[i].datasetStroke = false;
			  console.log(chart.datasets[i].points.length);
				while (chart.datasets[i].points.length >0){
			  	console.log(chart.datasets[i].points.length);
				chart.datasets[i].removePoint(0);
			}
                          }
                          }
                          }
                          chart.update();
                          } 
        function dis(){
			 
                          var label = 'Forth';
                       	  console.log("call " + label);
                          var chart = lineChart;
                          var store = chart.datasets;
                          var finded = false;
			console.log(store);
                          for (var i = 0; i < store.length; i++) {
                          console.log("Store name " + store[i][2]);
                          if (store[i][0] === label) {
                          finded = true;
                          var restored = store.splice(i, 1)[0][1];
                          chart.datasets.push(restored);
                          }
                          }
                          
                          if (!finded) {
                          console.log('Start search dataset with label = ' + label);
                          for (var i = 0; i < chart.datasets.length; i++) {
                          if (chart.datasets[i].label === label) {
                          chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
                          }
                          }
                          }
                          chart.update();
                          };     



//whenever i add this even the empty closure add data to graph gets lost
//var dataStore = {[{
//    label:"position",
//    data:[{0, 0}]
//  },{
//   label:"rate",
//    data:[{0,0}]
//  },{
//    label:"acceleration",
//    data:[{0,0}]
//  },{
//    label:"distance",
//    data:[{0,0}]
//  }]
  //this.addData =function(setIdx, dataX, dataY){
  //  this[setIdx][1].push({dataX,dataY});
  //};
  //this.dropPoint = function(setIdx){
  //  this[setIdx][1].shift();
  //};
//};


function addDataToChart(aPoint){
    if (!lineChart) {
        createGraph();
        console.log("creating chart");
    }
    
    this.aPoint = aPoint;
    var dist = 0.0;
    var rat = 0.0;
    var acc = 0.0;
    var pos = 0.0; // this is not used
    
    distancePoints.push(this.aPoint);
    //time = aPoint.info()[0]
    
    var  num_dis_points = distancePoints.length;


    if (num_dis_points>0) {        // once we have atleast 2 lat long we can get a distance
        dist = distancePoints[num_dis_points-1].info()[1];

        if(!total_distance){
            total_distance = dist;
            distance.push(new point(time,total_distance));// make this a point
            dataStore.addData("distance", time, total_distance)

        }else{
            if (_setLocation) {
                var point_a = startPoss.info();  //last point in array
                var len = coorPoints.length-1;
                var point_b = coorPoints[len].info();// second to last point
                var temp_dis = getDistanceFromLatLonInKm(point_a[0],point_a[1],point_b[0],point_b[1]);
                
                total_distance = temp_dis;
                distance.push(new point(time,total_distance));// make this a point
                dataStore.addData("distance", time, total_distance)
                
            }else{
                total_distance = total_distance+(Math.abs(dist-distancePoints[num_dis_points-2].info()[1]));
                distance.push(new point(time,total_distance));// make this a point
                dataStore.addData("distance", time, total_distance)
            }
            
            if (num_dis_points>1) {
                rat = dv_dt(distancePoints[num_dis_points-1],distancePoints[num_dis_points-2]);
                console.log(rat);
                rate.push(rat);
                ratePoints.push(new point(num_dis_points-2,rat));
                dataStore.addData("rate", time, rat)
                var  num_rate_points = ratePoints.length;
                if (num_rate_points>1) {
                    acc =dv_dt(ratePoints[num_rate_points-1],ratePoints[num_rate_points-2]);
                    acceleration.push(acc);
                    accelerationPoints.push(new point(num_rate_points-2,acc));
                    dataStore.addData("acceleration", time, acc)
                };
            };
            
            
            if (num_dis_points>4) {
              
                lineChart.datasets[3].addPoint(time, distancePoints[time+3].info()[1]);
                lineChart.datasets[1].addPoint(time, rate[time+1]);
                lineChart.datasets[2].addPoint(time, acceleration[time]);
                lineChart.datasets[0].addPoint(time, distance[time+3].info()[1]);
                lineChart.update();
                
                // lineChart.addData([distance[time+3].info()[1],rate[time+1],acceleration[time],distancePoints[time+3].info()[1]],time);
                time = time+1;
                console.log(dataStore);
            }

            if (time>20) {
              // console.log("lineChart.datasets.length:"+lineChart.datasets[0].length);
              lineChart.datasets[0].removePoint(time-21);
              lineChart.datasets[1].removePoint(time-21);
              lineChart.datasets[2].removePoint(time-21);
              lineChart.datasets[3].removePoint(time-21);
              lineChart.update();
              
 
            }
            
        }
        
    }
}



function reset(){
            
    dataOutArray = [];
    pointsArray = [];
    coorPoints = [];
    non_lat_long_Points = [];
    distancePoints = [];
    accelerationPoints = [];
    positionPoints = [];
    ratePoints = [];
    distance = [];
    rate = [];
    acceleration = [];
    drawArray = [];

    startTime;
    count = 0;
    time = 0;

    total_distance = un;
    time = 0;
    
    
    _setLocation = false;
    startPoss = un;

    goodPoint = false;
    currentLoc;
    lastLoc = new point(0,0);
    needsStarted = true;
        
    if (lineChart) {
      window.lineChart.destroy();
      lineChart =un;
    }
}


// getDistanceFromLatLonInKm
// this was just to test changing existing data on graph
function add_graph_line(){
    lineChart.datasets[1].points[0].value = 50;
    lineChart.datasets[1].points[2].value = 20;
    lineChart.datasets[2].points[0].value = 30;
    lineChart.datasets[2].points[2].value = 10;
    lineChart.update();
    
}


// takes derivitave of two points
function dv_dt(a_point,b_point){
    
    this.a_point = a_point.info();
    this.b_point = b_point.info();
    
    var a_x = this.a_point[0];
    var a_y = this.a_point[1];
    var b_x = this.b_point[0];
    var b_y = this.b_point[1];

    if ((a_x-b_x)==0) {
        return 0;
    }else{
    var new_rate = (a_y-b_y)/(a_x-b_x);
    return new_rate;
    };
    
}


function passToTableView(){
  shipper('distancePoints',distancePoints);
 
}








