//require statements
var ext = require('./ext');

//vars
var listOfFiles = [];
var dirname = process.argv[2];
var providedExt = process.argv[3];

ext(dirname, providedExt, function callback(err, listOfFilteredFiles){

	if (err){
		console.error("There was an error", err);
	}
	else{
		//loop thru list of returned array
		listOfFilteredFiles.forEach(function(file){
			console.log(file);
		})
		// for (var i=0; i<listOfFilteredFiles.length; i++){
		// 	console.log(listOfFilteredFiles[i]);
		// }		
	}
});

/* * * * * * * * * * *
 * OFFICIAL SOLUTION *
 * * * * * * * * * * * 
 --> Notice the console.error functionality -- we need to take advantage of this
 --> Get comfortable with for/each loops in js

    var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]

    filterFn(dir, filterStr, function (err, list) {
      if (err)
        return console.error('There was an error:', err)

      list.forEach(function (file) {
        console.log(file)
      })
    })
*/