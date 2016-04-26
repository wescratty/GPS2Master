/**
 * Created by wescratty on 3/18/16.
 */

function set_mode_walk(){
    mode = "walk";
    console.log("changed mode walk");
}

function set_mode_bike(){
    mode = "bike";
    console.log("changed mode bike");
}

function set_mode_drive(){
    mode = "drive";
    console.log("changed mode drive");
}

function displayInstructions(){
    show_dialoge("Push start button to start gathering data. It should take less then 5 seconds to start getting points. If no points are gathered try changing the mode to bike or drive.");
}