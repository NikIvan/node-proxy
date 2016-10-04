const http = require('http');
const CONST = require('../../config/constants.js');

module.exports = function(req, res) {
	var options = {
		host: CONST.handler.IP,
		port: CONST.handler.PORT,
		path: req.url,
		method: CONST.requestType.POST,
		headers: req.headers
	};

	var proxyReq = http.request(options);
	proxyReq.on('response', (proxyResponse) => {
		proxyResponse.pipe(res);
	});

	req.pipe(proxyReq);
};