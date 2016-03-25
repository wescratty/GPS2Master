document.addEventListener('deviceready', function () {

    console.log("device is ready in table");}, false

);

function addDataToTable() {

    var table = document.getElementById("dataTable");
    if ((table !== undefined) && (table !== null)) {
        var row = table.insertRow(-1);
        var timeCell = row.insertCell(0);
        var positionCell = row.insertCell(1);
        var velocityCell = row.insertCell(2);
        var accelerationCell = row.insertCell(3);
        timeCell.innerHTML = acceleration.length; // get number of points
        positionCell.innerHTML = total_distance.toFixed(2);
        velocityCell.innerHTML = (rate[rate.length -1] || 0).toFixed(2);
        accelerationCell.innerHTML = (acceleration[acceleration.length - 1] || 0).toFixed(2);
    }
}