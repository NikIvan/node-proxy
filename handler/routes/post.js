const fs = require('fs');
const path = require('path');
const FSReadWriteEmitter = require('../utils/FSReadWriteEmitter.js');
const CONST = require('../../config/constants.js');

module.exports = function(req, res) {
	var filePath = path.join(__dirname, '../data/data.dat')
	
	fsEmitter = new FSReadWriteEmitter(filePath);
	fsEmitter.once('done', () => {
		console.log('Read and write done');
		fs.appendFile(fsEmitter.filePath, fsEmitter.body, (err) => {
			if(err) {
				console.log('File writing error: ', err);
			}
		});
	});

	fs.open(fsEmitter.filePath, 'a+', (err, fd) => {
		if(err) {
			res.statusCode = CONST.statusCode.SERVER_ERROR;
			res.statusMessage = 'FS error';
			console.log(`FS error: ${ err.message }`);
		}

		var readStream = fs.createReadStream(null, { fd: fd });
		readStream.pipe(res);
		readStream.on('end', () => {
			fsEmitter.setReadFinished();
		});
	});

	var body = '';
	req.on('data', (data) => {
		body += data;
		// Terminate connection if body is too big
		if (body.length > 1e6) {
			req.connection.destroy();
		}
	}).on('end', () => {
		fsEmitter.setWriteFinished(body);
	});
};