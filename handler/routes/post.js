const fs = require('fs');
const path = require('path');
const CONST = require('../../config/constants.js');

module.exports = function(req, res) {
	fs.open(path.join(__dirname, '../data/data.dat'), 'a+', (err, fd) => {
		if(err) {
			res.statusCode = CONST.statusCode.SERVER_ERROR;
			res.statusMessage = 'FS error';
			console.log(`FS error: ${ err.message }`);
		}

		var fileContents = fs.readFileSync(fd);
		var writeStream = fs.createWriteStream(null, { fd: fd });
		var body = '';

		req.on('data', (data) => {
			writeStream.write(data);
		});

		req.on('end', () => {
			fs.close(fd);
			res.writeHead(CONST.statusCode.OK, { 'Content-Type': 'text/plain' });
			res.end(fileContents);
		});
	});
};