const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://youtube-api.run.goorm.io',
			changeOrigin: true,
		})
	);
};
