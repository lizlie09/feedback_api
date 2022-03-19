"use strict";
/**
 * ## Imports
 *
 */
//Mongoose - the ORM
var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId,
  Schema = Mongoose.Schema;

const UserSchema = new Mongoose.Schema(
  {
    reply: { type: String, required: false },
    conern: { type: String, required: false },
    rateComment: { type: String, required: false },
    concern: { type: Boolean, default: false },
    fullname: { type: String, required: true },
    establishment: { type: String, required: true },
    rate_one: { type: Number, required: false },
    rate_two: { type: Number, required: false },
    rate_three: { type: Number, required: false },
    rate_four: { type: Number, required: false },
    rate_five: { type: Number, required: false },
    rate_six: { type: Number, required: false },
    rate_seven: { type: Number, required: false },
    rate_eight: { type: Number, required: false },
    rate_nine: { type: Number, required: false },
    rate_ten: { type: Number, required: false },
    reports_comment: { type: String, required: false },
    reports: { type: Array, required: false },
    raterType: { type: String, required: false },
    report: { type: Boolean, default: false },
    rate: { type: Boolean, default: false },
    remarks: { type: Boolean, default: false },
    void: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Rate = Mongoose.model("ratings", UserSchema);

module.exports = Rate;
