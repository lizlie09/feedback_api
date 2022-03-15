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
    method: ["POST"],
    path: "/reply-report",
    handler: Handlers.reply_report,
    config: {
      auth: false,
    },
  },
  {
    method: ["GET"],
    path: "/get-assignedoffice-comments",
    handler: Handlers.get_assignedoffice_comments,
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

  {
    method: ["GET"],
    path: "/get-offices",
    handler: Handlers.get_offices,
    config: {
      auth: false,
    },
  },
  {
    method: ["POST"],
    path: "/create-office",
    handler: Handlers.create_office,
    config: {
      auth: false,
    },
  },
  {
    method: ["POST"],
    path: "/edit-office",
    handler: Handlers.edit_office,
    config: {
      auth: false,
    },
  },

  {
    method: ["GET"],
    path: "/get-rankings",
    handler: Handlers.get_rankings,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
