//console.log("args:" + process.argv);
var cmdlineargs = process.argv;
var sum = 0;

for (var i=2; i<cmdlineargs.length; i++){
	sum+= Number(cmdlineargs[i]);
}

console.log(sum);