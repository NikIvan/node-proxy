module.exports = {
	proxy: {
		IP: '127.0.0.1',
		PORT: 3030
	},
	handler: {
		IP: '127.0.0.1',
		PORT: 3031
	},
	requestType: {
		GET: 'GET',
		POST: 'POST',
		PUT: 'PUT',
		DELETE: 'DELETE',
	},
	statusCode: {
		BAD_REQUEST: 400,
		SERVER_ERROR: 500,
		OK: 200,
	}
};