//requires

var http = require('http');
var bufferedlist = require('bl');

//vars
var urls = getUrls(process.argv);
console.log(urls);

//callbacks

urls.forEach(function(url){

		http.get(url, function(response){
			response.pipe(bufferedlist(function(err,buffer){		
				console.log(url);
				console.log(buffer.toString());
				}) //end bufferedlist()
			)//end response.pipe		
		});
});





/******************/
/*Helper functions*/
/******************/
/*
 *Function to get the 3 urls
 *@param - process.argv[]
 *@return - array with urls passed
 */

function getUrls(args){
	var urls = [];
	for (var i=2; i<args.length; i++){
		urls[i-2] = args[i];
	}
	return urls;
}