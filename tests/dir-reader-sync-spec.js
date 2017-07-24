const fs = require('fs');
const path = require('path');
const DirReaderSync = require('../dir-reader-sync');

const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

const mockfs = require('mock-fs');

function getOSPath(pt) {
	return path.relative('./', pt);
}
before(function() {
	//Initial setup for testing the code
	/* Dir structure*/
	//	college
	//	|
	//	|- dept1
	//	|	|-section1
	//	|	|-dept2-details.txt
	//	|
	//	|- dept2
	//	|   |-section1
	//	|	|-dept2-details.txt
	//	|
	//	|- dept3
	//	|   |-dept3-details  - No file-type
	//	|
	//	|- college-details.txt
	//	
	mockfs({
		'college': {
			'dept1': {
				'section1': {},
				'dept2-details.txt': 'content of the dept2-details'
			},
			'dept2': {
				'section1': {},
				'dept2-details.txt': 'content of dept2-details'
			},
			'dept3': {
				'dept3-details': 'content of dept3-details'
			},
			'college-details.txt': 'college details'
		}
	});
});

after(function() {
	mockfs.restore();
});


describe('Testing the Class - DirReaderSync', function() {

	describe('+ve Testcases : Reading the root dir', function() {

		it(' +ve: Testing the instance of the Class DirReaderSync', function() {
			let rd = new DirReaderSync();
			expect(rd).to.exist;
		});

		it(' +ve: Tesing the property dirnames exists after instantiation', function() {
			let rd = new DirReaderSync();
			expect(rd).to.have.property("_dirnames");
			expect(rd.dirnames).to.have.length(0);
		});

		it(' +ve: Tesing the property filenames exists after instantiation', function() {
			let rd = new DirReaderSync();
			expect(rd).to.have.property("_filenames");
			expect(rd.filenames).to.have.length(0);
		});

		it(' +ve: Test reading with root dir', function() {
			let rd = new DirReaderSync();
			let result = rd.readDirSync('./college');
			let expected = {
				filenames: [
					getOSPath('college/college-details.txt'),
					getOSPath('college/dept1/dept2-details.txt'),
					getOSPath('college/dept2/dept2-details.txt'),
					getOSPath('college/dept3/dept3-details')
				],
				dirnames: [
					getOSPath('college/dept1'),
					getOSPath('college/dept1/section1'),
					getOSPath('college/dept2'),
					getOSPath('college/dept2/section1'),
					getOSPath('college/dept3')
				]
			};

			expect(result).to.have.property('filenames').with.lengthOf(4);
			expect(result).to.have.property('dirnames').with.lengthOf(5);

			expect(result.filenames).to.deep.equal(expected.filenames);
			expect(result.dirnames).to.deep.equal(expected.dirnames);
		});

		it(' +ve: Test reading with sub-dir', function() {
			let rd = new DirReaderSync();
			let result = rd.readDirSync('./college/dept1');
			let expected = {
				filenames: [getOSPath('college/dept1/dept2-details.txt')],
				dirnames: [getOSPath('college/dept1/section1')]
			};
			expect(result).to.have.property('filenames').with.lengthOf(1);
			expect(result).to.have.property('dirnames').with.lengthOf(1);

			expect(result.filenames).to.deep.equal(expected.filenames);
			expect(result.dirnames).to.deep.equal(expected.dirnames);
		});

		it(' +ve: Test reading with sub-dir having file with no file-type', function() {
			let rd = new DirReaderSync();
			let result = rd.readDirSync('./college/dept3');
			let expected = {
				filenames: [getOSPath('college/dept3/dept3-details')],
				dirnames: []
			};
			expect(result).to.have.property('filenames').with.lengthOf(1);
			expect(result).to.have.property('dirnames').with.lengthOf(0);

			expect(result.filenames).to.deep.equal(expected.filenames);
			expect(result.dirnames).to.deep.equal(expected.dirnames);
		});

		it(' +ve: Test reading with sub-dir having no data  returns an empty object', function() {
			let rd = new DirReaderSync();
			let result = rd.readDirSync('./college/dept2/section1');
			let expected = {
				filenames: [],
				dirnames: []
			};
			expect(result).to.have.property('filenames').with.lengthOf(0);
			expect(result).to.have.property('dirnames').with.lengthOf(0);

			expect(result.filenames).to.deep.equal(expected.filenames);
			expect(result.dirnames).to.deep.equal(expected.dirnames);
		});

		it('+ve: Test the no. of times the function readDirSync is called', function() {
			let rd = new DirReaderSync();
			let spy = chai.spy.on(rd, 'readDirSync');
			let result = rd.readDirSync('./college');
			expect(spy).to.have.been.called.exactly(6);
		});


	});

	describe('-ve Testcases : Reading the root dir', function() {
		it(' -ve: Test reading invalid dir', function() {
			expect(() => {
				let rd = new DirReaderSync();
				rd.readDirSync('./dept40');
			}).to.throw();
		});

		it(' -ve: Test reading invalid sub-dir', function() {
			expect(() => {
				let rd = new DirReaderSync();
				rd.readDirSync('./college/dept20');
			}).to.throw();
		});

		it(' -ve: Test reading existing file instead of directory', function() {
			expect(() => {
				let rd = new DirReaderSync();
				rd.readDirSync('./college/college-details.txt');
			}).to.throw();
		});

		it(' -ve: Test reading non-existing file instead of directory', function() {
			expect(() => {
				let rd = new DirReaderSync();
				rd.readDirSync('./college/college-otherinfo.txt');
			}).to.throw();
		});

	});

});