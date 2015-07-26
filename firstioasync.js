var fs = require('fs');

//get filename from args
var filename = process.argv[2]; //node[0], nodejsprogram[1], filename[2]

/*
* This is saying 
* 1. Me: Hey fs module, call the readFile function.
* 2. Me: Process the readFile method with callback function(err,buffer) while I continue with the program
* 3. fs Module: Hey Im done.
* 4. Me: Okay thanks Im already on line 8628723. Do this next one.. ?
*/
var numOfEndlines;
fs.readFile(filename, function callback(err, buffer){
	var str = buffer.toString();
	
	//read the buffer
	numOfEndlines = str.match(/\n/g).length;
	console.log(numOfEndlines);
	}
);

/** THIS IS IMPORTANT! 
/* if you put this console.log statement OUTSIDE your callback, the program
/* will get here first and not print out the numOfEndLines var
*/
//console.log(numOfEndlines);






//instructions
//---NO---//
// var callback = function(err, buffer){
// 	//get buffer object
// 	var buffer = fs.readFile(filename);
// 	var str = buffer.toString();

// 	//read the buffer
// 	var numOfEndlines = str.match(/\n/g)
// }



