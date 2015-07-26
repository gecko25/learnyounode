//modules
var filesystem = require('fs'); // read more --> file:///usr/local/lib/node_modules/learnyounode/node_apidoc/fs.html

var cmdlineargs = process.argv; //'node', 'path/to/nodejsfile', 'filename'
filename = cmdlineargs[2];

//readfile 
// var buffer = filesystem.readFileSync(filename); //returns a buffer object
// var str = buffer.toString();
var str = filesystem.readFileSync(filename).toString();

//loop thru string using reg ex
var numOfMatches = str.match(/\n/g).length;  //"/n" --> newline "/g" --> global identifier to match ALL instances

console.log(numOfMatches);
