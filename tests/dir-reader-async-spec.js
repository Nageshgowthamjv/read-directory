const fs = require('fs');
const path = require('path');
const ReadDirAsync = require('../dir-reader-async');

const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

function getOSPath(pt) {
	return path.relative('./', pt);
}
describe('Testing the Class - DirReaderAsync', function() {

	describe('+ve Testcases : Reading the root dir', function() {

		it(' +ve: Testing the instance of the Class ReadDirAsync', function() {
			let rd = new ReadDirAsync();
			expect(rd).to.exist;
		});

		it(' +ve: Test reading with root dir', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./college', function(err, result) {

				let expected = {
					filenames: [
						getOSPath('college/college-details.txt'),
						getOSPath('college/dept3/dept3-details'),
						getOSPath('college/dept1/dept2-details.txt'),
						getOSPath('college/dept2/dept2-details.txt')
					],
					dirnames: [
						getOSPath('college/dept1'),
						getOSPath('college/dept2'),
						getOSPath('college/dept3'),
						getOSPath('college/dept1/section1'),
						getOSPath('college/dept2/section1')
					]
				};

				expect(result).to.have.property('filenames').with.lengthOf(4);
				expect(result).to.have.property('dirnames').with.lengthOf(5);

				expect(result.filenames).to.deep.equal(expected.filenames);
				expect(result.dirnames).to.deep.equal(expected.dirnames);
				done();
			});

		});

		it(' +ve: Test reading with sub-dir', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./college/dept1', function(err, result) {
				let expected = {
					filenames: [getOSPath('college/dept1/dept2-details.txt')],
					dirnames: [getOSPath('college/dept1/section1')]
				};
				expect(result).to.have.property('filenames').with.lengthOf(1);
				expect(result).to.have.property('dirnames').with.lengthOf(1);

				expect(result.filenames).to.deep.equal(expected.filenames);
				expect(result.dirnames).to.deep.equal(expected.dirnames);
				done();
			});
		});

		it(' +ve: Test reading with sub-dir having file with no file-type', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./college/dept3', function(err, result) {
				let expected = {
					filenames: [getOSPath('college/dept3/dept3-details')],
					dirnames: []
				};
				expect(result).to.have.property('filenames').with.lengthOf(1);
				expect(result).to.have.property('dirnames').with.lengthOf(0);

				expect(result.filenames).to.deep.equal(expected.filenames);
				expect(result.dirnames).to.deep.equal(expected.dirnames);

				done();
			});
		});

		it(' +ve: Test reading with sub-dir having no data  returns an empty object', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./college/dept2/section1', function(err, result) {
				let expected = {
					filenames: [],
					dirnames: []
				};
				expect(result).to.have.property('filenames').with.lengthOf(0);
				expect(result).to.have.property('dirnames').with.lengthOf(0);

				expect(result.filenames).to.deep.equal(expected.filenames);
				expect(result.dirnames).to.deep.equal(expected.dirnames);
				done();
			});
		});

		it('+ve: Test the no. of times the function readDirAsync is called', function(done) {
			let rd = new ReadDirAsync();
			let spy = chai.spy.on(rd, 'readDirAsync');
			rd.readDirAsync('./college', function() {
				expect(spy).to.have.been.called.exactly(6);
				done();
			});
		});


	});

	describe('-ve Testcases : Reading the root dir', function() {

		it(' -ve: Test reading invalid dir', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./dept40', function(err, result) {
				expect(err).to.have.length(1);
				done();
			});
		});

		it(' -ve: Test reading invalid sub-dir', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./test1/dept20', function(err, result) {
				expect(err).to.have.length(1);
				done();
			});
		});

		it(' -ve: Test reading existing file instead of directory', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./college/college-details.txt', function(err, result) {
				expect(err).to.have.length(1);
				done();
			});
		});

		it(' -ve: Test reading non-existing file instead of directory', function(done) {
			let rd = new ReadDirAsync();
			rd.readDirAsync('./test1/collage-otherinfo.txt', function(err, result) {
				expect(err).to.have.length(1);
				done();
			});
		});

	});

});