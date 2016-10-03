const http = require('http');
const CONST = require('../config/constants.js');

const proxy = http.createServer((req, res) => {
	console.log('Got proxy request');

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

proxy.listen(CONST.proxy.PORT, CONST.proxy.IP, () => {
	console.log(`Server is running on ${ CONST.proxy.IP }:${ CONST.proxy.PORT }`);
});

proxy.on('error', (err) => {
	console.log(`Got error ${ err.message }`);
	process.exit(1);
});

