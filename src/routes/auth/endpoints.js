"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  // ADMIN ----------
  {
    method: ["GET"],
    path: "/test",
    handler: Handlers.test,
    config: {
      auth: false,
    },
  },
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
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/remove-scope",
    handler: Handlers.remove_scope,
    config: {
      auth: "token",
    },
  },
  {
    method: ["POST"],
    path: "/change-password",
    handler: Handlers.change_password,
    config: {
      auth: "token",
    },
  },
];

module.exports = internals;
