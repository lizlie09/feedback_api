"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: ["GET"],
    path: "/get-ratertypes",
    handler: Handlers.get_ratertypes,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/get-performance",
    handler: Handlers.get_performance,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/get-reported-department",
    handler: Handlers.get_reported_department,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/get-respondents",
    handler: Handlers.get_respondents,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/get-pending-resolved",
    handler: Handlers.get_pending_resolved,
    config: {
      auth: "token",
    },
  },
  {
    method: ["POST"],
    path: "/reply-report",
    handler: Handlers.reply_report,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/get-assignedoffice-comments",
    handler: Handlers.get_assignedoffice_comments,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/get-comments",
    handler: Handlers.get_comments,
    config: {
      auth: "token",
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
      auth: "token",
    },
  },
  {
    method: ["POST"],
    path: "/edit-office",
    handler: Handlers.edit_office,
    config: {
      auth: "token",
    },
  },

  {
    method: ["GET"],
    path: "/get-rankings",
    handler: Handlers.get_rankings,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/get-admins",
    handler: Handlers.get_admins,
    config: {
      auth: "token",
    },
  },
];

module.exports = internals;
