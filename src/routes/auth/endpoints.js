"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  // ADMIN ----------

  {
    method: ["POST"],
    path: "/auth/login",
    handler: Handlers.login,
    config: {
      auth: false,
    },
  },
  {
    method: ["POST"],
    path: "/auth/signup",
    handler: Handlers.signup,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
