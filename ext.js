//requires
var fs = require('fs');

module.exports =function getListOfFilteredFiles(dirname, ext, callback){}
	var listOfAllFiles;
	var listOfFilteredFiles = [];
	var err=null;
	/* First, do the logic stuff */

	//get the listOfAllFiles from directory
	//listOfAllFiles = fs.readdirSync(dirname); // would we want to use a synchronous method here?

	listOfAllFiles = fs.readdir(dirname, function callback(){
			
		try{	
		//loop thru each file	
			if (listOfAllFiles.length===0){ throw "There are no files in this directory" };

			for (var i=0;i<listOfAllFiles.length;i++){
				var filename = listOfAllFiles[i];
				console.log("filename:" + filename); //debug statement
				console.log("providedExt:" + providedExt); //debug statement

				var currentExt = path.extname(filename);
				console.log("currentExt:" + currentExt); //debug statement

				//check if it matches
				if (currentExt.localeCompare(providedExt)===0)
				{
					//add file to array
					listOfAllFiles.push(filename);
				}
			}//end for-loop
		}catch(e){
			err = e;
		}finally{
			/* Second, call the callback  */
			return callback(err, listOfAllFiles);
		} 
	}); //end of fs.readdir callback
}//end of module function getListOfFilteredFiles