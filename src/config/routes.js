"use strict";

var Auth = require("../routes/auth/endpoints");
var Rating = require("../routes/rating/endpoints");
var Admin = require("../routes/admin/endpoints");

var internals = {};

internals.routes = [].concat(
  Auth.endpoints,
  Rating.endpoints,
  Admin.endpoints
);

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
