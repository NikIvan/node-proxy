const http = require('http');
const CONST = require('../../config/constants.js');

module.exports = function(req, res) {
	var body = '';

	req.on('data', (data) => {
		body += data;
	});

	req.on('end', () => {
		var options = {
			host: CONST.handler.IP,
			port: CONST.handler.PORT,
			path: '/',
			method: CONST.requestType.POST,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
	      'Content-Length': Buffer.byteLength(body),
			},
		};

		var proxyReq = http.request(options, (proxyRes) => {
			var responseString = '';

			proxyRes.on('data', (data) => {
				responseString += data;
			});

			proxyRes.on('end', () => {
				console.log('Request to handler success!');
				res.end(`Got from handler: ${ responseString }`);
			});
		});

		proxyReq.write(body);
		proxyReq.end();
	});
};