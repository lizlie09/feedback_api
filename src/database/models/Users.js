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
    name: {type : String, required : false },
    isEstablishment: {type : Boolean, default : false },
    firstname: {type : String, required : true },
    lastname: {type : String, required : true },
    middlename: {type : String, required : true },
    email: {type : String, required : true },
    password: {type : String, required : true },
    void: {type : Boolean, default : false },
    scope: {
      type: Array,
      'default': ['visitor']
    },
    },
    {
      timestamps: true, _id: true,
    });

var Users = Mongoose.model("users", UserSchema);

module.exports = Users;
