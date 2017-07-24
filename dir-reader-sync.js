const fs = require('fs');
const path = require('path');
const DirReader = require('./dir-reader');

class DirReaderSync extends DirReader {

	readDirSync(folder) {

		folder = path.resolve(folder);
		let fsContents = [];

		try {
			fsContents = fs.readdirSync(folder);
		} catch (err) {
			throw {
				name: "Error",
				message: "Path is not available"
			};
		}

		fsContents.forEach(x => {
			let currentPath = path.join(folder, x);
			this.readSubDirSync(currentPath);
		});

		return {
			filenames: this.filenames,
			dirnames: this.dirnames
		};
	}

	readSubDirSync(currentPath) {
		let stat = fs.statSync(currentPath);
		let rpath = path.relative('./', currentPath)
		if (stat.isFile()) {
			this.filenames.push(rpath);
		} else if (stat.isDirectory()) {
			this.dirnames.push(rpath);
			this.readDirSync(currentPath);
		}
	}

}

module.exports = DirReaderSync;