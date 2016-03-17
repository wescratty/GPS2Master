

document.addEventListener('deviceready', function () {
    console.log("device is ready in io");

/* Drew, will have to delete all of the shipper stuff and just set */
// ------ need to use shipper to get the file we want and set as global file name else data.csv will get over ridden. -------
	var locFileName= "export.csv";
// if (window.name =='graph') {
// 		console.log('graph opened io');
// 		distance=receivingArray('distance');
// 		locFileName = "export.csv";
// 	}else if(window.name =='tableView'){
//
// 		console.log('tableView opened io');
// 		locFileName = "export.csv";
// 	}else if (window.name == "index"){
// 		console.log('index opened io');
// 		locFileName = "username.txt";
// 	}



 console.log(device.platform);
     if (device.platform == "Android") {
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
            console.log("Main Dir android:", dir);
            dir.getFile(locFileName, {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
                //writeLog("App started");
            });
        });
    }
    else if (device.platform == "iOS") {
       
            window.resolveLocalFileSystemURL(cordova.file.documentsDirectory, function (dir) {
            console.log("Main Dir:", dir);
            dir.getFile(locFileName, {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
                //writeLog("App started");
            });
        });
    
    }else if (device.platform == "browser") {
		 //    var $chooser = $( "<input type=\"file\"id=\"input\"name=\"img\"onchange=\"handleFiles(this.files)\">" );
        // $chooser.appendTo( $( "#fileChooser" ) );
     

    }// end of iff


console.log("Right before run call ");
var fileApp = new FileApp();
            fileApp.run();
            console.log("Right after run call ");
            // setUP();
});



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

// function csvToarray(aString){
//     var strArr = aString.split(/\n/);
//     testdata = [];
//     var tempArr = []
//     var temp;

//     console.log("hasComment");

//     var hasComment = strArr[0].match(/Comment:/) ? strArr[0].match(/Comment: ([\w\s]+)/) : false; 
//     console.log(hasComment);


//     var i = hasComment ? 1:0;


//     for (i ; i < strArr.length; i++) {
//         temp= strArr[i].split(/,/);
//         tempArr[i]=[parseFloat(temp[0]),parseFloat(temp[1])];
//         if (!tempArr[i][0]&&!tempArr[i][1]) {continue};// might cause error
//         testdata.push(tempArr[i]);
//     };
// }

function CSVTable(aString){
    var strArr = aString.split(/\n/);
    var firstLine = strArr[0];
    
        if (firstLine.match(/Comment: ([\w\s,]+)/)) {
            console.log("found match ");
            comment = firstLine.match(/Comment: ([\w\s,]+)/)[0];
            var i = 1;
        }else{
            var i = 0;
            comment =  "No Comments";
        }


    var $table = $( "<table id=\"t01\"><caption>Data Points</caption></table>" );

    var $line = $( "<h4></h4>" );
    $line.append( $( "<h4></h4>" ).html( comment) );
    $table.append( $line );

    
    console.log("strArr.length: "+strArr.length);
    for (i; i < strArr.length; i++ ) {

        var dat = strArr[i].split(/,/);
        console.log("dat[0]: "+dat[0]);
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
fileNameField: null,
textField: null,
    
run: function() {
    var that = this;
    // writeFileButton = document.getElementById("writeFileButton"),
    // readFileButton = document.getElementById("readFileButton"),
    // deleteFileButton = document.getElementById("deleteFileButton");
	// var emailFileButton = document.getElementById("emailFileButton");
    
    // that.fileNameField = document.getElementById("fileNameInput");
    that.textField = document.getElementById("textInput");

    
     // writeFileButton.addEventListener("click",
     //                                     function() {
     //                                         that._writeTextToFile.call(that);
     //
     //                                    });
     //
     //    readFileButton.addEventListener("click",
     //                                    function() {
     //                                        that._readTextFromFile.call(that);
     //                                    });
     //
     //    deleteFileButton.addEventListener("click",
     //                                      function() {
     //                                        that._deleteFile.call(that)
     //                                    });
     //
     //     emailFileButton.addEventListener("click",
     //     								  function() {
     //            							tryEmail();
     //        							});


    fileSystemHelper = new FileSystemHelper();

},
    
_deleteFile: function () {
    var that = this,
    fileName = that.fileNameField.value;
    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.deleteFile(fileName, that._onSuccess, that._onError);
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
_readTextFromFile: function() {
    var that = this,
    fileName = that.fileNameField.value;
    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.readTextFromFile(fileName, that._onSuccess, that._onError);
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
    
    
_writeTextToFile: function() {
    // console.log("success, _writeTextToFile");
    var that = this,
     // fileName = that.fileNameField.value;
	fileName = locFileName;
     text = "Comment: "+that.textField.value+"\n";

     
     if (distance.length>0) {
     	text = text+ arrayToCsv(distance);
        if (that._isValidFileName(fileName)&&!fileSelector) {
            fileSystemHelper.writeLine(fileName, text, that._onSuccess, that._onError)

        }else{
            var error = { code: 44, message: "Invalid filename"};
            that._onError(error);
        }
     }else{
        // text = document.getElementById("result").textContent;
        alert("You have no data yet!");
        console.log("trying to add data but no data");
     	// text = that.textField.value;
     }
     
    
    // var body = that.textField.value;
    // if (!body) {
    // 	console.log("no body message");

    // }else{
    // 	shipper('body',body);
    // }
    

    
   
},
    
_onSuccess: function(value) {
    var notificationBox = document.getElementById("result");
    notificationBox.textContent = value;
},
    
_onError: function(error) {
    
    var errorCodeDiv = document.createElement("div"),
    errorMessageDiv = document.createElement("div"),
    notificationBox = document.getElementById("result");
    
    errorCodeDiv.textContent = "Error code: " + error.name;
    errorMessageDiv.textContent = "Message: " + error.message;
    
    notificationBox.innerHTML = "";
    notificationBox.appendChild(errorCodeDiv);
    notificationBox.appendChild(errorMessageDiv);
},
    
_isValidFileName: function(fileName) {
    //var patternFileName = /^[\w]+\.[\w]{1,5}$/;
    
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

								 },
								 function(error) {
									 error.message = "Request file system failed.";
									 onError.call(that, error);
								 });
	},
    
	_createFile: function(fileSystem, fileName, text, onSuccess, onError) { 
        // console.log("success, _createFile");
		var that = this;
		var options = {
			create: true, 
			exclusive: false
		};
		if(!logOb){
			logOb=fileSystem;
		}

		fileSystem.root.getFile(fileName, options,
								function(logOb) {
									that._createFileWriter.call(that, logOb, text, onSuccess, onError);
									//--------------------------- Is this the
									// logOb = fileSystem.root;
//									logOb = fileEntry;

                                console.log("line 65");

								},
								function (error) {
									error.message = "Failed creating file.";
									onError.call(that, error);
								});
	},


    
	_createFileWriter: function(logOb, text, onSuccess, onError) {
        // console.log("success, _createFileWriter");
		var that = this;
		logOb.createWriter(function(fileWriter) {
                                    var len = fileWriter.length;
                                    fileWriter.seek(len);
                                    fileWriter.write(text + '\n');
                                    var message = "Wrote to file " ;
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
        // console.log("success, readTextFromFile");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
								 function(fileSystem) {
                                    if(!logOb){
                                        logOb=fileSystem;
                                        console.log("logOb: " +logOb)
                                    }
									 that._getFileEntry.call(that, logOb, fileName, onSuccess, onError);
								 },
								 function(error) {
									 error.message = "Unable to request file system.";
									 onError.call(that, error);
								 });
	},
    
	_getFileEntry: function(logOb, fileName, onSuccess, onError) {
        // console.log("success, _getFileEntry");
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
        // console.log("success, _getFile");
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
        // console.log("success, _getFileReader");
		var that = this;
		var reader = new FileReader();
		reader.onloadend = function(evt) { 
			var textToWrite = evt.target.result;
		CSVTable(textToWrite); 
			// onSuccess.call(that, textToWrite);
		
		};
        
		reader.readAsText(file);
	},

    // coming from file
	_getFileReader2: function(file, onSuccess) {
		// console.log(file);
		var reader = new FileReader();
		reader.onload = function(e) { 
			var textToWrite = reader.result;
			console.log(textToWrite);
            CSVTable(textToWrite);
			// var notificationBox = document.getElementById("result");
   //      notificationBox.textContent = textToWrite;

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
                			onSuccess.call(that, message);
                		}, function (error) {
                			error.message = "Unable to remove the file.";
                			onError.call(that, error)
                		});
	}
};