

document.addEventListener('deviceready', function () {

    console.log("device is ready in graph");}, false);

function createGraph() {
    
    var data = {
    labels: [],
    datasets: [{
               label: "First",
               fillColor: "rgba(220,220,220,0.2)",
               strokeColor: "rgba(220,20,20,1)",
               pointColor: "rgba(220,20,20,1)",
               pointStrokeColor: "#fff",
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(220,220,220,1)",
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
               fillColor: "rgba(151,187,205,0.2)",
               strokeColor: "rgba(15,187,25,1)",
               pointColor: "rgba(15,187,25,1)",
               pointStrokeColor: "#fff",
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(151,187,205,1)",
               data: []
               }, {
                label: "Forth",
               fillColor: "rgba(255, 255, 0,0.2)",
               strokeColor: "rgba(255, 255, 0,1)",
               pointColor: "rgba(255, 255, 0,1)",
               pointStrokeColor: "#fff",
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(255, 255, 0,1)",
               data: []
               }]
    };
    
    
    var options = {
        // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
        // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value + ' %' %>",pointDotRadius : 1,scaleGridLineColor : "rgba(255, 255, 0,.05)",    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
    
    var ctx = document.getElementById("updating-chart").getContext("2d");
    
    window.lineChart = new Chart(ctx).Line(data, options);
    window.lineChart.store = new Array();
}
    
    // $('#pos').click(function () {
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
                        for (var i = 0; i < chart.datasets.length; i++) {
                        if (chart.datasets[i].label === label) {
                        chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
                        }
                        }
                        }
                        chart.update();
                        }
    // $('#vol').click(function () {
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
                        for (var i = 0; i < chart.datasets.length; i++) {
                        if (chart.datasets[i].label === label) {
                        chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
                        }
                        }
                        }
                        chart.update();
                        }
    // $('#acc').click(function () {
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
                          for (var i = 0; i < chart.datasets.length; i++) {
                          if (chart.datasets[i].label === label) {
                          chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
                          }
                          }
                          }
                          chart.update();
                          } 
        function dis(){
                          var label = 'Forth';
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
                          for (var i = 0; i < chart.datasets.length; i++) {
                          if (chart.datasets[i].label === label) {
                          chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
                          }
                          }
                          }
                          chart.update();
                          }     
// }

//------------------Attention Brian------------------
function addDataToChart(aPoint){
  if (!lineChart) {
    createGraph();
  }
  
    this.aPoint = aPoint;
    var dist = 0.0;
    var rat = 0.0;
    var acc = 0.0;
    var pos = 0.0;
    
    


   distancePoints.push(this.aPoint);
   
    
    var  num_dis_points = distancePoints.length;
    if (num_dis_points>0) {        // once we have atleast 2 lat long we can get a distance
      dist=distancePoints[num_dis_points-1].info()[1];
       if(!total_distance){
      total_distance = dist;
      distance.push(new point(time,total_distance));// make this a point
    }else{
      total_distance = total_distance+dist-distance[num_dis_points-1] ;
        distance.push(new point(time,total_distance));// make this a point
    }
        
        

        if (num_dis_points>1) {
            rat = dv_dt(distance[num_dis_points-1],distance[num_dis_points-2]);
            rate.push(rat);
            ratePoints.push(new point(num_dis_points-2,rat));
            var  num_rate_points = ratePoints.length;
            if (num_rate_points>1) {
                acc =dv_dt(ratePoints[num_rate_points-1],ratePoints[num_rate_points-2]);
                acceleration.push(acc);
                accelerationPoints.push(new point(num_rate_points-2,acc));
                
            };
        };
        
    };

    if (num_dis_points>2) {
      // console.log(distancePoints[time].info()[1]);
            lineChart.addData([distance[time+2].info()[1],rate[time+1],acceleration[time],distancePoints[time].info()[1]],time);

      // lineChart.addData([distance[time+2],rate[time+1],acceleration[time],distancePoints[time].info()[1]],distancePoints[time].info()[0]);
    time = time+1;
    };
    
    
    
    
}
function reset(){
  // if (lineChart.dataSets.length > 0) {
            // REMOVE LATEST DATASET AND VALIDATE
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

             startTime;
             count = 0;
             time = 0;

             total_distance = 0;
            time = 0;
            window.lineChart.destroy();
            createGraph();
    
    lineChart.update();
}

// this was just to test changing existing data on graph
function add_graph_line(){
    lineChart.datasets[1].points[0].value = 50;
    lineChart.datasets[1].points[2].value = 20;
    lineChart.datasets[2].points[0].value = 30;
    lineChart.datasets[2].points[2].value = 10;
    lineChart.update();
    
}

// // unimplemented and maybe depricated
// function flow(){
//     var tempPoint = getGeoPosition();
    
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
    var new_rate = (a_y-b_y)/(a_x-b_x);
    return new_rate;
    };
    
}


function passToTableView(){
  shipper('distancePoints',distancePoints);
 
}








