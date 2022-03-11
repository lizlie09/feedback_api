"use strict";

var Auth = require("../routes/auth/endpoints");

var internals = {};

internals.routes = [].concat(Auth.endpoints);

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
