const fs = require('fs');
const path = require('path');

class DirReader {

	constructor() {
		this._filenames = [];
		this._dirnames = [];
	}

	get filenames() {
		return this._filenames;
	}

	get dirnames() {
		return this._dirnames;
	}

}

module.exports = DirReader;