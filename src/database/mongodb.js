"use strict";

var Mongoose = require("mongoose"),
  Config = require("../config");

var connection_string = "";

if (Config.env.dev) {
  connection_string =
    "mongodb://" +
    Config.mongodb.ip +
    ":" +
    Config.mongodb.port +
    "/" +
    Config.mongodb.app +
    "?authSource=admin";
} else {
  connection_string =
    "mongodb://" +
    Config.mongodb.username +
    ":" +
    Config.mongodb.password +
    "@" +
    Config.mongodb.ip +
    ":" +
    Config.mongodb.port +
    "/" +
    Config.mongodb.app +
    "?authSource=admin";
}

console.log("started", connection_string);
console.log("rocess.env.NODE_ENV", process.env.NODE_ENV);
console.log("Config.mongodb", Config.mongodb);
Mongoose.Promise = global.Promise;
Mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() =>
    console.log(`Connected to Databasez! ${Config.env.dev ? "Dev" : "Prod"}`)
  )
  .catch((err) => console.log(err));
