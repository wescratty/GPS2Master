function changeGraphColor(ds, color) {
    console.log("changing color");
    window.lineChart.datasets[ds].fillColor = color;
    window.lineChart.datasets[ds].strokeColor = color;
    window.lineChart.datasets[ds].highlightFill = color;
    window.lineChart.datasets[ds].highlightStroke = color;
    window.lineChart.update();
}

