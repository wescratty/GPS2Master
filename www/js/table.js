document.addEventListener('deviceready', function () {

    console.log("device is ready in table");}, false
    
);

function addDataToTable() {

    var table = document.getElementById("dataTable");
    if ((table !== undefined) && (table !== null)) {
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        cell0.innerHTML = acceleration.length;
        cell1.innerHTML = total_distance.toFixed(2);
        cell2.innerHTML = (acceleration[acceleration.length - 1] || 0).toFixed(2);
        cell3.innerHTML = (rate[rate.length -1] || 0).toFixed(2);
    }
}