//handles phone data persistence and phone file readin

//todo I know wes had this working
function savetoCSV(Filename){

}

function readinCSV(Filename){

}

function loadCSV(){

}


document.addEventListener('deviceready', function () {
    console.log("device is ready in io");

if(!localStorage.getItem('x')) {
  console.log("no storage");
} else {
  // distancePoints = localStorage.getItem('x');
  var dp = JSON.parse(localStorage["x"]);
}
for (var i = 0; i < dp.length; i++) {
	distancePoints.push(new point(dp[i].x,dp[i].y));
	// console.log(p.info());
}

    // distancePoints = window.localStorage.getItem("passVal");

var fileApp = new FileApp();
    fileApp.run();

}, false);



function makeCSVString(an_array){
    var temp ;
    var dat = an_array[0];
        temp = dat.info()+"\r\n"; //the array is passed from line 150 but is lost when we 
        // switch windows. We need to save the data. maybe jquery?

    for (var i = 1; i< an_array.length; i++) {
        console.log(an_array.length);
        dat = an_array[i];
        temp = temp+dat.info()+"\r\n";
    }
    
    return temp;
    
}


function loadCSVString(aString){
    var strArr = aString.split(/\n/);
    testdata = [];
    var tempArr = []
    var temp;
    for (var i = 0; i < strArr.length; i++) {
        // console.log(strArr[i]);
        temp= strArr[i].split(/,/);
        console.log(strArr.length);
        tempArr[i]=[parseFloat(temp[0]),parseFloat(temp[1])];
        if (!tempArr[i][0]&&!tempArr[i][1]) {continue};// might cause error
        console.log(tempArr[i]);
        testdata.push(tempArr[i]);
    };
}

//todo wes does this look rightish?
function load_data(data){
    var resultArray = []
    for (var i = 0;i< data.length;i++) {
        var temp_arr = data[i];
        var a_point = new point(temp_arr[0],temp_arr[1]);

        resultArray.push(a_point);
    };
    return resultArray;
}


function FileApp() {
}

FileApp.prototype = {
fileSystemHelper: null,
fileNameField: null,
textField: null,
    
run: function() {
    var that = this,
    writeFileButton = document.getElementById("writeFileButton"),
    readFileButton = document.getElementById("readFileButton"),
    deleteFileButton = document.getElementById("deleteFileButton");
    
    that.fileNameField = document.getElementById("fileNameInput");
    that.textField = document.getElementById("textInput");
    
     writeFileButton.addEventListener("click",
                                         function() { 
                                             that._writeTextToFile.call(that);
                                             // writeF();
                                         });
        
        readFileButton.addEventListener("click",
                                        function() {
                                            that._readTextFromFile.call(that);
                                            // readF();
                                        });
        
        deleteFileButton.addEventListener("click",
                                          function() {
                                              that._deleteFile.call(that)
                                              // tryEmail();
                                          });



         emailFileButton.addEventListener("click",
            function() {
                //that._deleteFile.call(that)
                tryEmail();
            });


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
    var that = this,
     fileName = that.fileNameField.value,
    text = makeCSVString(distancePoints);
    // text = that.textField.value;
//    console.log(fileName);


    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.writeLine(fileName, text, that._onSuccess, that._onError)
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
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
        
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
								 function(logOb) {
									 that._getFileEntry.call(that, logOb, fileName, onSuccess, onError);
									 // console.log(fileSystem);
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
				// console.log(file);
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
			console.log("isAvailable2");
			loadCSVString(textToWrite);
			console.log("isAvailable3");
			onSuccess.call(that, textToWrite);
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