    var http = require('http');
    var results = [];
    var strReceived = [];
    var urls = [];
    var count=0;

for (var i=2; i<process.argv.length; i++){
  urls[i-2] = process.argv[i];
}

function printOutput(results){
  results.forEach(function(data){
    console.log(data);
    console.log("=======");
  }) 
}

urls.forEach(function(url){
    http.get(url, function(response){
      response.setEncoding('utf8');
      
      response.on('data', function(data){
      strReceived.push(data);
      })

      response.on('end', function(){      
        console.log(url);
        var output = strReceived.join("");
        results[count] = output;
        strReceived=[];
        count++;
        
        if (count==urls.length){
          printOutput(results);
        }

      })
    })
})

//printOutput(results);  



/* these were our mistakes last time, 
1. The printOutput function is OUTISDE the get function AND the response.on function --> BAD!
   You need to find the rate limiting step crucial to your function and put whatever to be triggered, there.
    (in this case, the rate limiting step was the nested response.on('end') event handler)

2. There was no good trigger to indicate all the urls had been processed (ie count===urls.length)

3. Be expicit about order and indices here, its important. these forEach statements are getting you 
   into trouble!
*/


