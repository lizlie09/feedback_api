"use strict";

var Auth = require("../routes/auth/endpoints");
var Rating = require("../routes/rating/endpoints");
var Dashboard = require("../routes/dashboard/endpoints");

var internals = {};

internals.routes = [].concat(
  Auth.endpoints,
  Rating.endpoints,
  Dashboard.endpoints
);

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
