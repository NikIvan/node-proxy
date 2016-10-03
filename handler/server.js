const http = require('http');
const url = require('url');
const CONST = require('../config/constants.js');

const handler = http.createServer((req, res) => {
	switch(req.method) {
	case CONST.requestType.POST:
		require('./routes/post.js')(req, res);
		break;
	default:
		res.statusCode = CONST.statusCode.BAD_REQUEST;
		res.statusMessage = 'Wrong request';
		res.end();
		break;
	}
});

handler.listen(CONST.handler.PORT, CONST.handler.IP, () => {
	console.log(`Server is running on ${ CONST.handler.IP }:${ CONST.handler.PORT }`);
});

handler.on('error', (err) => {
	console.log(`Got error ${ err.message }`);
	process.exit(1);
});