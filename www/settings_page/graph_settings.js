
function saveLocalStorageGraphSettings() {
    localStorage.positionColor = document.getElementById("positionColor").value;
    localStorage.velocityColor = document.getElementById("velocityColor").value;
    localStorage.accelerationColor = document.getElementById("accelerationColor").value;
}

function loadLocalStorageGraphSettings () {
    document.getElementById("positionColor").value = localStorage.positionColor;
    document.getElementById("velocityColor").value = localStorage.velocityColor;
    document.getElementById("accelerationColor").value = localStorage.accelerationColor;

    changeGraphColor(0, document.getElementById("positionColor").value)
    changeGraphColor(1, document.getElementById("velocityColor").value)
    changeGraphColor(2, document.getElementById("accelerationColor").value)
}

function changeGraphColor(ds, color) {
    console.log("changing color");
    window.lineChart.datasets[ds].fillColor = color;
    window.lineChart.datasets[ds].strokeColor = color;
    window.lineChart.datasets[ds].highlightFill = color;
    window.lineChart.datasets[ds].highlightStroke = color;
    window.lineChart.datasets[ds].pointHighlightStroke = color;
    window.lineChart.datasets[ds].pointStrokeColor = color;
    window.lineChart.datasets[ds].pointHighlightFill = color;
    window.lineChart.update();
}

function changeXRange(){

x_range = document.getElementById("xRange").value;
}