
document.addEventListener('deviceready', function () {
    console.log("device is ready in io");

});

function initIo() {
    // got to be a cleaner way...
    var d = new Date().toLocaleString().replace(/,/g , "").replace(/ /g , "").replace(/\//g , "").replace(/:/g , "");
    fileName= first_name+last_name+d+".csv";
//    console.log("first_name+last_name: "+first_name+last_name);
//    console.log(fileName);


    console.log(device.platform);
    if (device.platform == "Android") {
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
            console.log("Main Dir android:", dir);
            directory = dir;
            dir.getFile(fileName, {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
            });
        });
    }
    else if (device.platform == "iOS") {

        window.resolveLocalFileSystemURL(cordova.file.documentsDirectory, function (dir) {
            console.log("Main Dir:", dir);
            directory = dir;
            console.log("directory: ",directory);
            dir.getFile(fileName, {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
            });
        });

    }else if (device.platform == "browser") {
     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function(fileSystem) {

                       console.log("Main Dir:", fileSystem);
                                   directory = fileSystem;
                                   console.log("directory: ",directory);
                                   fileSystem.root.getFile(fileName, {create: true}, function (file) {
                                       console.log("File: ", file);
                                       logOb = file;
                                   });
                               });

    }
    
    fileApp = new FileApp();
    fileApp.run();
}


function arrayToCsv(an_array){
    var temp ;
    var dat = an_array[0];
    temp = dat.info()+"\n";

    for (var i = 1; i< an_array.length; i++) {
        dat = an_array[i];
        temp = temp+dat.info()+"\n";
    }
    return temp;
}


function CSVTable(aString){
    var strArr = aString.split(/\n/);
    $("#result").empty();
    var $table = $( "<table id=\"t01\"><caption>Data Points</caption></table>" );

    for (var i=0; i < strArr.length; i++ ) {

        var dat = strArr[i].split(/,/);
        var $line = $( "<tr></tr>" );

        $line.append( $( "<td></td>" ).html( dat[0]) );
        $line.append( $( "<td></td>" ).html( dat[1]) );
        $table.append( $line );
    }

    $table.appendTo( $( "#result" ) );

// var snd = new Audio("resources/notify.wav"); // buffers automatically when created
// snd.play();
}

// ********* File read and right below **********
function FileApp() {}

FileApp.prototype = {
    fileSystemHelper: null,
    textField: null,

    run: function() {
        var that = this;
        fileSystemHelper = new FileSystemHelper();
    },

    _deleteFile: function () {
        console.log("in io delete file");
        var that = fileApp;

        if (that._isValidFileName(fileName)) {
            fileSystemHelper.deleteFile(fileName, that._onSuccess, that._onError);
        }
        else {
            var error = { code: 44, message: "Invalid filename"};
            that._onError(error);
        }
    },

    _readTextFromFile: function() {
        var that = fileApp;

        if (that._isValidFileName(fileName)) {
            fileSystemHelper.readTextFromFile(fileName, that._onSuccess, that._onError);
        }
        else {
            var error = { code: 44, message: "Invalid filename"};
            that._onError(error);
        }
    },

    _writeTextToFile: function() {
        var that = fileApp;

        if (distance.length>0) {
            text = arrayToCsv(distance);
            if (that._isValidFileName(fileName)&&!fileSelector) {
                fileSystemHelper.writeLine(fileName, text, that._onSuccess, that._onError)

            }else{
                var error = { code: 44, message: "Invalid filename"};
                that._onError(error);
            }
        }else{
            show_dialoge("You have no data yet!");
        }
    },

    _onSuccess: function(value) {
        // showPosition();
        show_dialoge(value);
    },

    _onError: function(error) {
        var mess1 = "Error code: " + error.name;
        var mess2 =  "Message: " + error.message;
        show_dialoge(mess1+"\n"+mess2);
    },

    _isValidFileName: function(fileName) {

        return fileName.length > 2;
    }
}





function FileSystemHelper() {
}

FileSystemHelper.prototype = {

    //Writing operations
    writeLine: function(fileName, text, onSuccess, onError) {
        console.log("success, text", text);
        var that = this;
        var grantedBytes = 0;



        window.requestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes,
            function(fileSystem) {
                that._createFile.call(that, fileSystem, fileName, text, onSuccess, onError);
                logOb = fileSystem;

            },
            function(error) {
                error.message = "Request file system failed.";
                onError.call(that, error);
            });
    },

    _createFile: function(fileSystem, fileName, text, onSuccess, onError) {
        var that = this;
        var options = {
            create: true,
            exclusive: false
        };

        if (device.platform == "browser") {
            logOb=fileSystem;
        }else{
            // fileSystem=logOb;
        }
        // if(!logOb){
        //     logOb=fileSystem;
        // }
        // logOb=fileSystem;

        fileSystem.root.getFile(fileName, options,
            function(logOb) {
                that._createFileWriter.call(that,fileName, logOb, text, onSuccess, onError);

                console.log("line 222");

            },
            function (error) {
                error.message = "Failed creating file.";
                onError.call(that, error);
            });
    },



    _createFileWriter: function(fileName, logOb, text, onSuccess, onError) {
        var that = this;
        logOb.createWriter(function(fileWriter) {
                var len = fileWriter.length;
                fileWriter.seek(len);
                fileWriter.write(text + '\n');
                var message = "Wrote to file "+fileName ;
                onSuccess.call(that, message);
            },
            function(error) {
                error.message = "Unable to create file writer.";
                onError.call(that, error);
            });

    },



    //Reading operations
    readTextFromFile : function(fileName, onSuccess, onError) {
        var that = this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                if(!logOb){
                    logOb=fileSystem;
                    console.log("logOb: " +logOb)
                }
                //------------------------- some thing is wrong here -----------------------------------------------------------
                if(device.platform !== "browser"){
                    fileSystem=logOb;
                }
                that._getFileEntry.call(that, logOb, fileName, onSuccess, onError);
            },
            function(error) {
                error.message = "Unable to request file system.";
                onError.call(that, error);
            });
    },

    _getFileEntry: function(logOb, fileName, onSuccess, onError) {
        var that = this;
        // Get existing file, don't create a new one.
        logOb.root.getFile(fileName, null,
            function(logOb) {
                that._getFile.call(that, logOb, onSuccess, onError);
            },
            function(error) {
                error.message = "Unable to get file entry for reading.";
                onError.call(that, error);
            });
    },

    _getFile: function(logOb, onSuccess, onError) {
        var that = this;
        logOb.file(
            function(file) {
                that._getFileReader.call(that, file, onSuccess);

            },
            function(error) {
                error.message = "Unable to get file for reading.";
                onError.call(that, error);
            });
    },

    _getFileReader: function(file, onSuccess) {
        var that = this;
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var textToWrite = evt.target.result;
            CSVTable(textToWrite);


        };

        reader.readAsText(file);
    },

    // coming from file
    _getFileReader2: function(file, onSuccess) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var textToWrite = reader.result;
            CSVTable(textToWrite);
        };

        reader.readAsText(file);
    },

    //Deleting operations
    deleteFile: function(fileName, onSuccess, onError) {
        var that = this;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                that._getFileEntryForDelete.call(that, fileSystem, fileName, onSuccess, onError);
            }, function(error) {
                error.message = "Unable to retrieve file system.";
                onError.call(that, error);
            });
    },

    _getFileEntryForDelete: function(fileSystem, fileName, onSuccess, onError) {
        var that = this;
        fileSystem.root.getFile(fileName,
            null,
            function (logOb) {
                that._removeFile.call(that, logOb, onSuccess, onError);
            },
            function(error) {
                error.message = "Unable to find the file.";
                onError.call(that, error)
            });
    },

    _removeFile : function(logOb, onSuccess, onError) {
        var that = this;
        logOb.remove(function (entry) {
            var message = "File removed.";
            $("#result").empty();
            onSuccess.call(that, message);
        }, function (error) {
            error.message = "Unable to remove the file.";
            onError.call(that, error)
        });
    }
};