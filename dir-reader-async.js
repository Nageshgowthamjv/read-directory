const fs = require('fs');
const path = require('path');

class DirReaderAsync {

	readDirAsync(dir, callback) {
		let content = {
			filenames: [],
			dirnames: []
		};
		var that = this;

		fs.readdir(dir, function(err, fscontents) {
			if (err) return callback([err]);

			var pending = fscontents.length;
			if (!pending) return callback(null, content);

			fscontents.forEach(function(file) {
				file = path.resolve(dir, file);

				fs.stat(file, function(err, stat) {
					if (err) return callback([err]);

					if (stat && stat.isDirectory()) {
						content.dirnames.push(path.relative('./', file));

						that.readDirAsync(file, function(err, res) {
							content.filenames = content.filenames.concat(res.filenames);
							content.dirnames = content.dirnames.concat(res.dirnames);
							if (!--pending) callback(null, content);
						});
					} else {
						content.filenames.push(path.relative('./', file));
						if (!--pending) callback(null, content);
					}
				});
			});
		});
	}

}

module.exports = DirReaderAsync;