"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: ["GET"],
    path: "/get-ratertypes",
    handler: Handlers.get_ratertypes,
    config: {
      auth: false,
    },
  },
  {
    method: ["GET"],
    path: "/get-performance",
    handler: Handlers.get_performance,
    config: {
      auth: false,
    },
  },
  {
    method: ["GET"],
    path: "/get-reported-department",
    handler: Handlers.get_reported_department,
    config: {
      auth: false,
    },
  },
  {
    method: ["GET"],
    path: "/get-comments",
    handler: Handlers.get_comments,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
