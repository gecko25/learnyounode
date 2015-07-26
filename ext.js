//requires
var fs = require('fs');
var path = require('path');

module.exports.getListOfFilteredFiles =function (dirname, ext, callback){
	var listOfAllFiles;
	var listOfFilteredFiles = [];
	var providedExt = ext;
	var err=null;
	/* First, do the logic stuff */

	//get the listOfAllFiles from directory
	listOfAllFiles = fs.readdirSync(dirname);  //was unable to use readdir(dirname, callback) --> RangeError: max call statck size
			
		try{	
		//loop thru each file	
			if (listOfAllFiles.length===0){ throw "There are no files in this directory" };

			//console.log("listOfAllFiles.length:" + listOfAllFiles.length); debug statement

			 for (var i=0;i<listOfAllFiles.length;i++){
				var filename = listOfAllFiles[i];
				//console.log("filename:" + filename); //debug statement
				//console.log("providedExt:" + providedExt); //debug statement

				var currentExt = path.extname(filename);
				//console.log("currentExt:" + currentExt); //debug statement

				//check if it matches
				if (currentExt.localeCompare(providedExt)===0)
				{
					//add file to array
					listOfFilteredFiles.push(filename);
				}
			}//end for-loop
		}catch(e){
			console.log("There was an error: " + e.message);
			err = e;
		}finally{
			/* Second, call the callback  */
			return callback(err, listOfFilteredFiles);
		} 
	//}); //end of fs.readdir callback
}//end of module function getListOfFilteredFiles