"use strict";

var Mongoose = require("mongoose"),
  Config = require("../config");

var connection_string = "";

connection_string =
  "mongodb+srv://" +
  Config.mongodb.username +
  ":" +
  Config.mongodb.password +
  "@" +
  Config.mongodb.clusterUrl + // changes to switch db
  `/${Config.mongodb.db}` + // staging 'visitour', prod 'Visitour'
  "?retryWrites=true&w=majority";

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
