

var app = ons.bootstrap();
var pop;


app.controller('DropdownController', function($scope, sharedProperties) {


$scope.go = function($event) {
    //console.log("action: ",$event.target.attributes.id.value);
    setAction = $event.target.attributes.id.value;

    sharedProperties.listDir();

    $scope.popover.show($event);


  }
    ons.createPopover('popover.html').then(function(popover) {
    console.log("fired pop");
        $scope.popover = popover;
        pop=$scope.popover;


        
    });
});


app.service('sharedProperties', function () {

    return {

        listDir: function() {
            console.log("in listDir");
            $("#popMessage").empty();
                // file_entries = un;

                var path = directory.nativeURL;


                if (device.platform == "browser"){
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,



                                    function (fileSystem) {
                                        var reader = fileSystem.root.createReader();
                                        reader.readEntries(
                                            function (entries) {
                                                file_entries = entries;
                                                var i;
                                                for (i=0; i<entries.length; i++) {
                                                    console.log(entries[i].name);
                                                }
                                                // console.log(entries);

                                                var onsList = $("#popMessage");
                                                for (var i=0; i<file_entries.length; i++) {
                                                    if (file_entries[i].name !== "NoCloud" && file_entries[i].name !== "Backups") {
                                                    var file_name = file_entries[i].name.match(/(\w{17})\./);
                                                     onsList.append('<ons-list-item modifier="tappable" id = ' + i + ' onclick="showButtonId(this.id)" class="list__item ons-list-item-inner">' + file_name[1] + '</ons-list-item>');
                                                    console.log(file_name[1]);
                                                    }
                                                }
                                            },
                                            function (err) {
                                                console.log(err);
                                            }
                                        );
                                    }, function (err) {
                                        console.log(err);
                                    }
                                );

                }else{






                window.resolveLocalFileSystemURL(path,
                    function (fileSystem) {
                        var reader = fileSystem.createReader();
                        reader.readEntries(
                            function (entries) {
                                file_entries = entries;
                                var i;
                                for (i=0; i<entries.length; i++) {
                                    console.log(entries[i].name);
                                }
                                // console.log(entries);

                                var onsList = $("#popMessage");
                                for (var i=0; i<file_entries.length; i++) {
                                    if (file_entries[i].name !== "NoCloud" && file_entries[i].name !== "Backups") {
                                    var file_name = file_entries[i].name.match(/(\w{17})\./);
                                     onsList.append('<ons-list-item modifier="tappable" id = ' + i + ' onclick="showButtonId(this.id)" class="list__item ons-list-item-inner">' + file_name[1] + '</ons-list-item>');
                                    console.log(file_name[1]);
                                    }
                                }
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                    }, function (err) {
                        console.log(err);
                    }
                );
                }
        }
    };
});


//function prepare(){
//    initIo();
//}

function showButtonId(that) {
    console.log("showButtonId that: ",that);

    if(setAction =='selectForDelete'||setAction =='selectForEmail'){
        exportInfo(that,tryEmail);
    }else{

        console.log("in show");
        console.log(file_entries[that].name);
        indexId = that;
    }
}


function exportInfo(that,callBack){
    pop.hide();
    console.log("exportInfo");
    fileName = file_entries[that].name;
    console.log("fileName: ",fileName);




    if(setAction=='selectForDelete'){
        console.log("selectForDelete");
        _delete(fileName);
    }else if(setAction=='selectForEmail'){
        console.log("selectForEmail");
        directory.getFile(fileName, {create: false}, function (file) {
                            console.log("File: ", file);
                            logOb = file;
                            callBack();

                        }
                        );

    }
}


//ons.ready(function() {
//    $(document.body).on("pageinit", '#export-page', function($scope) {
//
//        // listDir();
//    });
//});


function save() {
     initIo();
//     var func= initIo();
//    func();


    console.log("in save");


}


function _delete(fileName) {
    console.log("in _delete");

    if(fileName=="NoCloud"||fileName=="Backups"){
        show_dialoge("Please select a different file.");
    }else{
        console.log("after else");
        fileApp._deleteFile.call(FileApp);

    }
}


function tryEmail() {

    var email;
    var attachment = logOb.nativeURL;
    console.log("attachment: ",attachment);
    var first;
    var last;
    var teacher_email;


    if (receiver_email !== "" || receiver_email !== null) {
        teacher_email = receiver_email;
    } else {
        teacher_email = "doranillich@gmail.com";
    }
    if (first_name !== "" || first_name !== null) {
        first = first_name;
    } else {
        first = "Unknown";
    }
    if (last_name !== "" || last_name !== null) {
        last = last_name;
    } else {
        last = "Unknown";
    }
    if (user_email !== "" || user_email !== null) {
        email = user_email;
    } else {
        email = "Unknown";
    }
    if (img_url !== "" || img_url !== null) {
        var str = "Google Map";
        if(!img_url){
        img_url=makeImgUrl();
        }
        var result = str.link(img_url);
        var _body = result;
    } else {
        var _body = "";
    }

    var _subject = 'Chart data from ' + first + ' ' + last;



    if (!logOb) {
        show_dialoge("You havent made a file yet. Please conseider returning to graph and pressing start. Then go to expoert and save data.");
        attachment = "";
    } else {
        attachment = logOb.nativeURL;
    }

    if (device.platform == "browser") {
        console.log("in email");
        window.location="https://mail.google.com/mail?view=cm&tf=0"+teacher_email+"&su"+_subject+"&body"+_body;
    } else{
    console.log("in email else-------------");

        cordova.plugins.email.isAvailable(
            function () {

                cordova.plugins.email.open({
                    to: email,
                    cc: "",
                    bcc: [],
                    subject: _subject,
                    body: _body,
                    attachments: [attachment]
                });
            }
        );
    }
}



// just for reference

//function listDir(){
//    console.log("in listDir");
//    // file_entries = un;
//
//    var path = directory.nativeURL;
//    window.resolveLocalFileSystemURL(path,
//        function (fileSystem) {
//            var reader = fileSystem.createReader();
//            reader.readEntries(
//                function (entries) {
//                    file_entries = entries;
//                    var i;
//                    for (i=0; i<entries.length; i++) {
//                        console.log(entries[i].name);
//                    }
//                    // console.log(entries);
//
//                     addToPopList();
//                },
//                function (err) {
//                    console.log(err);
//                }
//            );
//        }, function (err) {
//            console.log(err);
//        }
//    );
//}


//function addToPopList() {
//    console.log("in addToPopList: ");
//    // $("#popMessage").empty();
//    var onsList = $("#popMessage");
//    for (var i=0; i<file_entries.length; i++) {
//        if (file_entries[i].name !== "NoCloud" && file_entries[i].name !== "Backups") {
//            onsList.append('<ons-list-item modifier="tappable" id = ' + i + ' onclick="showButtonId(this.id)" class="list__item ons-list-item-inner">' + file_entries[i].name + '</ons-list-item>');
//        }
//    }
//
//}