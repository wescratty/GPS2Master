// This is a JavaScript file

function autoZoom() {
    _autoZoom = !_autoZoom;
    if(!_autoZoom){
        show_choice();
    }
    
}

function show_choice() {

    ons.notification.prompt({
        message: 'Enter custom zoom level\n Currently zoom is set at '+currentZoom,
        callback: function(customZoom) {
            ons.notification.alert({
                message: 'Zoom is now ' + customZoom + '.'
            });
        }
});

}