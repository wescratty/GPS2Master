document.addEventListener('deviceready', function () {

    console.log("device is ready in table");}, false

);



ons.ready(function() {
    $(document.body).on("pageinit", '#tabel-page', function() {

        var count = $('#dataTable tr').length;
        console.log("table row length: ",count);

            var table = document.getElementById("dataTable");

            // if ((table !== undefined) && (table !== null)) {
                for(i = count;i<acceleration.length;i++){
                var row = table.insertRow(-1);
                var timeCell = row.insertCell(0);
                var positionCell = row.insertCell(1);
                var velocityCell = row.insertCell(2);
                var accelerationCell = row.insertCell(3);
                timeCell.innerHTML = i; // get number of points
                positionCell.innerHTML = (distance[i].info()[1]).toFixed(2);
                velocityCell.innerHTML = (rate[i] || 0).toFixed(2);
                accelerationCell.innerHTML = (acceleration[i] || 0).toFixed(2);
            // }

        }
    });
});

// function addDataToTable() {
//
//     var table = document.getElementById("dataTable");
//     if ((table !== undefined) && (table !== null)) {
//         var row = table.insertRow(-1);
//         var timeCell = row.insertCell(0);
//         var positionCell = row.insertCell(1);
//         var velocityCell = row.insertCell(2);
//         var accelerationCell = row.insertCell(3);
//         timeCell.innerHTML = acceleration.length; // get number of points
//         positionCell.innerHTML = total_distance.toFixed(2);
//         velocityCell.innerHTML = (rate[rate.length -1] || 0).toFixed(2);
//         accelerationCell.innerHTML = (acceleration[acceleration.length - 1] || 0).toFixed(2);
//     }
// }