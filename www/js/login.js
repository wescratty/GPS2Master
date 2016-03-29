/**
 * Created by wescratty on 3/29/16.
 */

function getUserName() {

    // var userStr = document.getElementById("useremail").value;
    // var username = userStr.match(/(\D+)@/);
    // console.log("username: ",username[1]);
    // var first_last = username[1].split(/"."/)[0];
    // first_name = first_last[0];
    // last_name = first_last[1];
    //
    // console.log("first_name: ",first_name);
    // console.log("last_name: ",last_name);






    user_email = document.getElementById("useremail").value;
    var username = user_email.match(/(\D+)@/);
    var lastPoint = username[1].lastIndexOf(".");



    first_name =  username[1].substring(0, lastPoint);
    last_name = username[1].substring(lastPoint + 1);

    first_name=capitalizeFirstLetter(first_name);
    last_name=capitalizeFirstLetter(last_name);

    console.log("first_name: ",first_name);
    console.log("last_name: ",last_name);



    // if(document.getElementById("useremail").value && document.getElementById("password").value){
    //     user_email = document.getElementById("useremail").value;
    //     user_password = document.getElementById("password").value;
    //    
    //     myNavigator.resetToPage('sliding_menu.html', {animation : 'lift' });
    //
    // } else{
    //     alert("User name and password required");
    //
    // }
    
}




function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function validateForm() {
    var x = document.getElementById("useremail").value;
    var y = document.getElementById("userpassword").value;


    if(x.match(/(\D+)@/)){
        var username = x.match(/(\D+)@/);
        var lastPoint = username[1].lastIndexOf(".");

    }else{
        show_dialoge("School Email must be filled out in the form \"first.last@yourSchool.edu\"");
        return false;
    }

    if (x == null || x == ""||y == null || y == "") {
        show_dialoge("School Email and a password must be filled out");
        return false;
    }else if(y.length<6){
        show_dialoge("Your password must be at least 6 digits");
        return false;

    }else if (lastPoint == null || lastPoint == "" ) {
        show_dialoge("School Email must be filled out in the form \"first.last@yourSchool.edu\"");
        return false;
    }else{
       return myNavigator.resetToPage('sliding_menu.html', {animation : 'lift' });
    }
}