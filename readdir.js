var DirReaderSync = require('./dir-reader-sync');
var DirReaderAsync = require('./dir-reader-async');

if (process.argv[3] == '-sync' && !!process.argv[2]) {
	try {
		var rdSync = new DirReaderSync();
		console.log(rdSync.readDirSync(process.argv[2]));
	} catch (e) {
		console.log(e);
	}
} else if ((process.argv[3] == '-async' || !process.argv[3]) && !!process.argv[2]) {
	var rdAsync = new DirReaderAsync();
	rdAsync.readDirAsync(process.argv[2], function(err, result) {
		if (err && err.length > 0) {
			console.log(result);
		} else {
			console.log(result);
		}
	});
} else {
	console.log('Please provide the correct parameters\n node cmd.js <dir>\n node cmd.js <dir> -sync\n node cmd.js <dir> -async\n')
}