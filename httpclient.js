var http = require('http');
var url = process.argv[2];

http.get(url, function callback(response){
		//Q: Why is this callback signature different?
		//Becuase any error information is contained in the response object? 
		//We dont need a specific err object?

		//The on method returns a buffer object. 
		//We need to set encoding to utf8 so that is prints readable strings
		response.setEncoding('utf8');

		response.on('data', function(chunk) {			
  			console.log(chunk);
		});
});


/***************
UNDERSTANDING **
****************
//There are a few things we need to know to write this class 
(all info from API)

- Objects in node emit events. (examples: fs.readStream emits an event when the file is
opened, net.Server emits an event each time a peer connects to it) All objects that 
emit events are instances of events.EventEmitter. (1)
- A stream is an abstract interface in node. (2)
- Stream objects emit events (3) && thus is an instance of events.EventEmitter 
(this is how the "on" method comes from events.EventEmitter )
- An http response to a server is a stream object (it "implements"/links 
to the stream object)

events<--stream<--http  (remember behavior delegation is bottom up!)

*1* https://nodejs.org/api/events.html#events_emitter_on_event_listener
*2* https://nodejs.org/api/stream.html#stream_stream
*3* https://nodejs.org/api/stream.html#stream_event_data

*****************
OFFICIAL SOLUTION
*****************

var http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
})

**/

