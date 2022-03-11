'use strict';

var internals = {},
	config = require('../config'),
	User = require('../database/models/User'),
	Config = require('../config');

internals.validate = async (decodedToken, req, h) => {
	return User.findById(decodedToken.id)
		.then(res => ({ isValid: true, credentials: res }))
		.catch(err => ({ isValid: false, credentials: {} }))
};

internals.setAuthStrategy = async function (server) {
	await server.register(require('@hapi/cookie'));
	await server.register({
		plugin: require('hapi-auth-jwt2'),
		options: {},
	});

	server.auth.strategy('token', 'jwt', {
		key: config.crypto.privateKey,
		validate: internals.validate,
	});

	server.auth.strategy('session', 'cookie', {
		cookie: {
			name: 'ca-auth',
			password: Config.auth.password,
			isSecure: false,
			ttl: (10000000 * 60 * 60 * 24) / 24,
		},
		redirectTo: '/admin/log-in?alert=expired',
		appendNext: true
	});

	server.auth.default('session');
};

module.exports = {
	setStrategy: internals.setAuthStrategy,
};
