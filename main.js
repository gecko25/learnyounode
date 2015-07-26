//require statements
var ext = require('./ext');

//vars
var listOfFiles = [];
var dirname = process.argv[2];
var providedExt = "." + process.argv[3];

ext.getListOfFilteredFiles(dirname, providedExt, function callback(err, listOfFilteredFiles){

	if (err==null){
		//loop thru list of returned array
		for (var i=0; i<listOfFilteredFiles.length; i++){
			console.log(listOfFilteredFiles[i]);
		}
	}
	else{
		console.log(err);
	}

});