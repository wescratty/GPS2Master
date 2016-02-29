    var service = new WebService();
    service.initialize().done(function () {
        renderHomeView();
    });

//action='graph.html'
function renderHomeView() {

     var html =

    "<h1>Sign In</h1>" +

    "<form id = 'get_email' autocomplete='on' method='post' enctype='text/plain'>" +
    "<br>" +
    "<br>" +

    "First name:<br> <input type='text' name='fname'><br><br>" +
    "E-mail:<br>     <input type='email' name='email'><br><br>" +
    "E-mail to:<br>  <input type='email' name='emailTo'><br><br>" +
    "<input class='SBP' style='background-color:rgb(0, 153, 204)' type='submit' onclick ='saveInfo();' >" +
    "<input class='SBP' style='background-color:rgb(0, 153, 204)'type='reset' value='Reset'>" +

    "</form>";

    $('body').html(html);
}

function renderGraphView() {
    var html =
        "<h1>Graph View</h1>";
    $('body').html(html);
}

var _myName;
var _myEmail;
var _emailTo;

/*document.addEventListener('deviceready', function () {
    window.name = "index";

});*/
function sendUserInfo(textToWrite) {
    var info = textToWrite.split(/~/);
    if (info.length > 2) {
        document.getElementsByTagName("fname").value = info[0];
        document.getElementsByTagName("email").value = info[1];
        document.getElementsByTagName("emailTo").value = info[2];
    }
}


function clickedButton() {

    console.log("clickedButton called");
    window.location = 'graph.html';
}

function success() {
    alert("Your credentials have been saved");
}

function errorsave() {
    alert("Didnt find file------------------------------------");
}

function errorfound() {
    alert("Nothing  wrote");
}

function getInfo() {
    _myName = document.getElementsByTagName("fname");
    _myEmail = document.getElementsByTagName("email");
    _emailTo = document.getElementsByTagName("emailTo");

}

function saveInfo() {
    getInfo();
    shipper('userinfo', _myName.value + "~" + _myEmail.value + "~" + _emailTo.value);
    console.log("saveInfo called");
    service.initialize().done(function () {
        renderGraphView();
    });
}
