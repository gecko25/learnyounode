//requires
var path = require('path');
var fs = require('fs');

//vars from cmd line
var dirname = process.argv[2];
var providedExt = "." + process.argv[3];

//vars
var listOfFiles;

//callbacks
fs.readdir(dirname, function callback(err, listOfFiles){
	//loop through each file
	for (var i=0;i<listOfFiles.length;i++){
		var filename = listOfFiles[i];
		//console.log("filename:" + filename);
		//console.log("providedExt:" + providedExt);

		var currentExt = path.extname(filename);
		//console.log("currentExt:" + currentExt);


		//check if it matches
		if (currentExt.localeCompare(providedExt)===0)
		{
			console.log(filename);
		}
	}

	//check if it matches the extension

		//if match, print filename


});
