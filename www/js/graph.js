

document.addEventListener('deviceready', function () {

    console.log("device is ready in graph");}, false);

function createGraph() {
    
  var data = {
  labels: [],
  datasets: [{
    label: "First",
    fillColor: "rgba(220,20,20,0.2)",
    strokeColor: "rgba(220,20,20,1)",
    pointColor: "rgba(220,20,20,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,20,20,1)",
    data: []
  },{
    label: "Second",
    fillColor: "rgba(0, 191, 255,0.2)",
    strokeColor: "rgba(0, 191, 255,1)",
    pointColor: "rgba(0, 191, 255,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(0, 191, 255,1)",
    data: []
  }, {
    label: "Third",
    fillColor: "rgba(15,187,25,0.2)",
    strokeColor: "rgba(15,187,25,1)",
    pointColor: "rgba(15,187,25,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(15,187,25,1)",
    data: []
  }
    // , {
    //  label: "Forth",
    // fillColor: "rgba(255, 255, 0,0.2)",
    // strokeColor: "rgba(255, 255, 0,1)",
    // pointColor: "rgba(255, 255, 0,1)",
    // pointStrokeColor: "#fff",
    // pointHighlightFill: "#fff",
    // pointHighlightStroke: "rgba(255, 255, 0,1)",
    // data: []
    // }
  ]};
    
    
    var options = {
      // String - Template string for single tooltips
      // tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
      // String - Template string for multiple tooltips
      // multiTooltipTemplate: "<%= value + ' %' %>",pointDotRadius : 1,
      pointDotRadius : 3,
      // scaleGridLineColor : "#000000",
      scaleFontColor: "#000000"
    };
    
    var ctx = document.getElementById("updating-chart").getContext("2d");
    
    window.lineChart = new Chart(ctx).Line(data, options);
    window.lineChart.store = new Array();
}
    
    
function pos(){
    var label = 'First';
    var chart = window.lineChart;
    var store = chart.store;
    var finded = false;
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
        for (i = 0; i < chart.datasets.length; i++) {
            if (chart.datasets[i].label === label) {
              chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
            }
        }
    }
    chart.update();
}
    
function vol(){
    var label = 'Second';
    var chart = window.lineChart;
    var store = chart.store;
    var finded = false;
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
        for (i = 0; i < chart.datasets.length; i++) {
            if (chart.datasets[i].label === label) {
            chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
            }
        }
    }
    chart.update();
}
    
function acc(){
    var label = 'Third';
    var chart = window.lineChart;
    var store = chart.store;
    var finded = false;
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
        for (i = 0; i < chart.datasets.length; i++) {
            if (chart.datasets[i].label === label) {
                chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
            }
        }
    }
    chart.update();
} 
        // function dis(){
        //                   var label = 'Forth';
        //                   var chart = window.lineChart;
        //                   var store = chart.store;
        //                   var finded = false;
        //                   for (var i = 0; i < store.length; i++) {
        //                   console.log("Store name " + store[i][2]);
        //                   if (store[i][0] === label) {
        //                   finded = true;
        //                   var restored = store.splice(i, 1)[0][1];
        //                   chart.datasets.push(restored);
        //                   }
        //                   }
                          
        //                   if (!finded) {
        //                   console.log('Start search dataset with label = ' + label);
        //                   for (var i = 0; i < chart.datasets.length; i++) {
        //                   if (chart.datasets[i].label === label) {
        //                   chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
        //                   }
        //                   }
        //                   }
        //                   chart.update();
        //                   }     

function addDataToChart(disFromLastPoint, disFromStartPoint){
    if (!lineChart) {
        createGraph();
    }

    var lastPoint = disFromLastPoint;
    var startPoint = disFromStartPoint;
    var dist;
    var rat = 0.0;
    var acc = 0.0;
    var pointToUse = _fromStartPoint ? startPoint : lastPoint;


    distancePoints.push(lastPoint); // distance from the last Point

    var  num_dis_points = distancePoints.length;
    dist = pointToUse.info()[1];

    if(!total_distance){  // if not instantiated
        total_distance = dist;
    }else{
        total_distance = _fromStartPoint ? dist : total_distance+dist;
    }

    distance.push(new Point(time,total_distance));// make this a Point

    /* could make this a function*/
    if (num_dis_points>1) {
        rat = dv_dt(distance[num_dis_points-1],distance[num_dis_points-2]);
        console.log(rat);
        rate.push(rat);
        ratePoints.push(new Point(num_dis_points-2,rat));
    }

    /* could make this a function*/
    if (num_dis_points>2) {
            acc =dv_dt(ratePoints[num_dis_points-2],ratePoints[num_dis_points-3]);
            acceleration.push(acc);
            accelerationPoints.push(new Point(num_dis_points-3,acc)); 
    }
            
    
    if (num_dis_points>4) {
        lineChart.addData([distance[time+2].info()[1],rate[time+1],acceleration[time]],time);
        // lineChart.addData([distance[time+2].info()[1],rate[time+1],acceleration[time],distancePoints[time+2].info()[1]],time);
        time = time+1;
    }

    void(time>20&&lineChart.removeData());
    addDataToTable();
        
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

    startTime = un; // do we use this?
    currentLoc = un;

    count = 0;
    time = 0;

    total_distance = un;
    startPoss = un;
    
    
    transferingData = false;
    // _setLocation = false;
    goodPoint = false;
    needsStarted = true;
    
    lastLoc = new Point(0,0); // do we use this?
    
        
    if (lineChart) {
      window.lineChart.destroy();
      createGraph();
    }
}



// this was just to test changing existing data on graph
// function add_graph_line(){
//     lineChart.datasets[1].points[0].value = 50;
//     lineChart.datasets[1].points[2].value = 20;
//     lineChart.datasets[2].points[0].value = 30;
//     lineChart.datasets[2].points[2].value = 10;
//     lineChart.update();
// }

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

    return (a_y-b_y)/(a_x-b_x);
    }
    
}


/* Delet this after one page*/
// function passToTableView(){
//   console.log("distance.length: "+distance.length);
//   shipper('distance',distance);
//
// }
