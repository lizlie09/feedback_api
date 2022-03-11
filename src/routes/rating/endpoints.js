"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  // ADMIN ----------

  {
    method: ["POST"],
    path: "/rate",
    handler: Handlers.rate,
    config: {
      auth: false,
    },
  },
  {
    method: ["POST"],
    path: "/report",
    handler: Handlers.report,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
