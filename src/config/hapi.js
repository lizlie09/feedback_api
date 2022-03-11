"use strict";

// Imports
var Hapi = require("@hapi/hapi"),
  Config = require("../config"),
  Routes = require("./routes"),
  Auth = require("./auth"),
  logger = require("node-color-log"),
  moment = require("moment");

var internals = {};

exports.deployment = async () => {
  // Start Hapi Server
  internals.server = new Hapi.Server({ debug: { request: ["error"] } });
  internals.server.payload = Buffer.alloc(104857610);

  // Host and Port Config
  internals.server = new Hapi.Server({
    port: process.env.PORT || 5000,
    routes: {
      cors: {
        origin: ["*"], // an array of origins or 'ignore'
      },
    },
  });

  internals.server.events.on("response", function (request) {
    let codeColor;
    if (request.response.statusCode < 199) {
      codeColor = "white";
    } else if (request.response.statusCode < 299) {
      codeColor = "green";
    } else if (request.response.statusCode < 399) {
      codeColor = "orange";
    } else if (request.response.statusCode < 499) {
      codeColor = "red";
    } else if (request.response.statusCode < 599) {
      codeColor = "yellow";
    }
    const responseTime = moment(request.response.headers["x-res-end"]).diff(
      moment(request.response.headers["x-req-start"]),
      "milliseconds",
      true
    );
    logger
      .color("white")
      .log(`${request.info.remoteAddress} : `)
      .joint()
      .color("yellow")
      .log(`[${request.method.toUpperCase()}]`)
      .joint()
      .color("green")
      .log(` ${request.path} `)
      .joint()
      .bgColor(codeColor)
      .log(`${request.response.statusCode}`)
      .joint()
      .color("white")
      .log(` ${responseTime}ms`);
  });

  await internals.server.register(require("hapi-response-time"));

  // Set Authentication Strategy
  await Auth.setStrategy(internals.server);

  // Set Routes
  Routes.init(internals.server);

  return internals.server;
};
