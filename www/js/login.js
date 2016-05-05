/**
 * Created by wescratty on 3/29/16.
 */


ons.ready(function() {
$(document.body).on("pageinit", '#login-page', function() {
    loadLocalStorageLogin();
});
});


function loadLocalStorageLogin() {
    if (localStorage.getItem("email") !== null) {
        document.getElementById("useremail").value = localStorage.email;
    }
    if (localStorage.getItem("first_name") !== null) {
        document.getElementById("firstName").value = localStorage.first_name;
    }
    if (localStorage.getItem("last_name") !== null) {
        document.getElementById("lastName").value = localStorage.last_name;
    }
}

function getUserName() {
    return validateForm();
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function validateForm() {
    var x = document.getElementById("useremail").value;



    if(!x.match(/(\D+)@/)){
        
        show_dialoge("Instructor Email must be filled out");
        return false;
    }

    if (x == null || x == "") {
        show_dialoge("Instructor Email must be filled out");
        return false;
    }else{
        user_email = document.getElementById("useremail").value;
        first_name =  document.getElementById("firstName").value;
        last_name = document.getElementById("lastName").value;

        if (first_name == null || first_name == "") {
            show_dialoge("First name must be filled out");
            return false;
        }

        if (last_name == null || last_name == "") {
            show_dialoge("Last name must be filled out");
            return false;
        }

        first_name=capitalizeFirstLetter(first_name);
        last_name=capitalizeFirstLetter(last_name);

/*        console.log("first_name: ",first_name);
        console.log("last_name: ",last_name);*/


        localStorage.email = user_email;
        localStorage.first_name = first_name;
        localStorage.last_name = last_name;
        return myNavigator.resetToPage('sliding_menu.html', {animation : 'lift' });
    }
}