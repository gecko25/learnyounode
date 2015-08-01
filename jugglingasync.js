//requires
var http = require('http');
var bufferedlist = require('bl');

//vars
var urls = getUrls(process.argv);
var queue = [];

//callbacks
urls.forEach(function(url){
		http.get(url, function(response){ //outer callback
			
			var strReceived = [];
			response.setEncoding('utf8');
			
			response.on('data', function(data){ //inner callback
				strReceived.push(data);
			});

			response.on('end', function(){
				//console.log("received end event.. the url is " + url);
				var output = {url: url,
							  data: strReceived.join("")
							 }	 
							 
				//handle incoming URL
				if (urls.length>0){
					
					if (output.url==urls[0]){ //urls match
						console.log(output.data); //print
						urls.shift(); //remove 1st element in urls array
						
						if (queue.length>0) //check queue with new urls[]
							queue = checkqueue(queue, urls);
					}

					else{ //urls don't match, add to queue
						queue.push(output);	
					}
			}
		}); //end of 'end' event
	});
});		

/******************/
/*Helper functions*/
/******************/

/**Function to search queue
 * @param queue -- array of objects. Each object represents the url
 * @param urls  -- array of urls that was used to request data.
 *			       the index corresponds to the order to be printed
 * 				   (urls[0] is first, urls[1] is second, etc.)
*/
function checkqueue(queue, urls){
	//does queue contain the newly shifted urls[0]	
	var i=0;
	if (queue.length>0 && queue[i].url===urls[0]){
		//something in the queue matched, print to console
		console.log(queue[i].data);

		//remove from queue
		queue.splice(i,1);

		//remove that url from array
		urls.shift();

		//**Search queue again with updated queue and urls[]**//
		checkqueue(queue,urls);
	}
	return queue;									
}

/**Function to get the 3 urls**
 *@param args   -- process.argv[]
 *@return urls  -- array with urls passed
 */

function getUrls(args){
	var urls = [];
	for (var i=2; i<args.length; i++){
		urls[i-2] = args[i];
	}
	return urls;
}







/*****************
OFFICIAL SOLUTION
*****************

    var http = require('http')
    var bl = require('bl')
    var results = []
    var count = 0

    function printResults () {
      for (var i = 0; i < 3; i++)
        console.log(results[i])
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err)
            return console.error(err)

          results[index] = data.toString()
          count++

          if (count == 3)
            printResults()
        }))
      })
    }

    for (var i = 0; i < 3; i++)
      httpGet(i)

*****
Notes
*****

/* these were our mistakes when trying to implement this methodlogy,

1. The printOutput function is OUTISDE the get function AND the response.on function --> BAD!
   You need to find the rate limiting step crucial to your function and put whatever to be triggered, there.
    (in this case, the rate limiting step was the nested response.on('end') event handler). 
    We need to *count* callbacks!

2. There was no good trigger to indicate all the urls had been processed (ie count===urls.length)

3. Be expicit about order and indices here, its important. these forEach statements are getting you 
   into trouble! *count* *count* *count* use indices!

4. "Counting callbacks is one of the fundamental ways of managing async in Node. 
   Rather than doing it yourself, you may find it more convenient to rely on 
   a third-party library such as [async](http://npm.im/async) or [after](http://npm.im/after)"
*/