//requires
var fs = require('fs');
var path = require('path');

//Q: best convention to name all these callbacks and functions? 
//this caused an infinite loop before by mixing them up
module.exports = function (dirname, ext, maincallback){
	var listOfAllFiles;
	var listOfFilteredFiles = [];
	var providedExt;
	var err=null;
	/* First, do the logic stuff */

	fs.readdir(dirname, function read_dir_callback(err, listOfAllFiles){
		if (err){
			return maincallback(err, null);
		}

		if (!(ext.match(/^\./g))){   //if the first char (^) is not  a ".", add it (ie html--> .html)
			providedExt = "." + ext; 
		};


		//Q: the official answer didnt have a try/catch, 
		//but would this be appropriate or overkill?
		try{	
			if (listOfAllFiles.length===0){ throw "There are no files in this directory" };
			 
			 for (var i=0;i<listOfAllFiles.length;i++){
				var filename = listOfAllFiles[i];
				var currentExt = path.extname(filename);

				//check if it matches 
				if (currentExt.localeCompare(providedExt)===0)
					listOfFilteredFiles.push(filename);
				
			}//end for-loop
		}catch(e){
			err = e;
		}finally{
			return maincallback(err, listOfFilteredFiles);
		} 
	});		
}//end of module function getListOfFilteredFiles



/* * * * * * * * * * *
 * OFFICIAL SOLUTION *
 * * * * * * * * * * * 
--> check out the cool filter method on the list array <--
--loops thru array and uses the element as an argument for function
--if function returns true, the element stays, if not its popped (spliced?)
 
 var fs = require('fs')
    var path = require('path')

    module.exports = function (dir, filterStr, callback) {

      fs.readdir(dir, function (err, list) {
        if (err)
          return callback(err)

        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })

        callback(null, list)
      })
    }

*/