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
  {
    method: ["POST"],
    path: "/add-admin",
    handler: Handlers.add_admin,
    config: {
      auth: false,
    },
  },
  {
    method: ["GET"],
    path: "/remove-scope",
    handler: Handlers.remove_scope,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
