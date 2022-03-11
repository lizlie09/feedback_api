'use strict';
/**
 * ## Imports
 *
 */
//Mongoose - the ORM
var Mongoose = require('mongoose'),
    ObjectId = Mongoose.Schema.Types.ObjectId,
    Schema = Mongoose.Schema;

const UserSchema = new Mongoose.Schema({
    name: {type : String, required : true },
    year: {type : String, required : true },
    rate: {type : Number, required : true },
    increment: {type : Number, required : true },
    },
    {
      timestamps: true, _id: true,
    });


var Ranking = Mongoose.model("rankings", UserSchema);

module.exports = Ranking;