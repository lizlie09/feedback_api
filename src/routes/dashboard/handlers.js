"use strict";

var internals = {};

var Rate = require("../../database/models/rate"),
  internals = {};

var moment = require("moment");

internals.get_ratertypes = async (req, reply) => {
  let raterTypes = await Rate.aggregate([
    {
      $group: {
        _id: "$raterType",
        total: { $sum: 1 },
      },
    },
  ]);

  return {
    success: true,
    raterTypes,
  };
};

internals.get_performance = async (req, reply) => {
  let rate = {};
  var condition = {
    $and: [{ report: false }, { rate: true }, { void: false }],
  };
  let performance = await Rate.aggregate([
    { $match: condition },
    {
      $group: {
        _id: null,
        rCount: { $sum: 1 },
        rone: { $sum: "$rate_one" },
        rtwo: { $sum: "$rate_two" },
        rthree: { $sum: "$rate_three" },
        rfour: { $sum: "$rate_four" },
        rfive: { $sum: "$rate_five" },
        rsix: { $sum: "$rate_six" },
        rseven: { $sum: "$rate_seven" },
        reight: { $sum: "$rate_eight" },
        rnine: { $sum: "$rate_nine" },
        rten: { $sum: "$rate_ten" },
      },
    },
  ]);

  if (performance[0]) {
    rate.Cnt = performance[0].rCount;
    rate.rateOne = performance[0].rone.toFixed(2);
    rate.rateTwo = performance[0].rtwo.toFixed(2);
    rate.rateThree = performance[0].rthree.toFixed(2);
    rate.rateFour = performance[0].rfour.toFixed(2);
    rate.rateFive = performance[0].rfive.toFixed(2);
    rate.rateSix = performance[0].rsix.toFixed(2);
    rate.rateSeven = performance[0].rseven.toFixed(2);
    rate.rateEight = performance[0].reight.toFixed(2);
    rate.rateNine = performance[0].rnine.toFixed(2);
    rate.rateTen = performance[0].rten.toFixed(2);
  } else {
    rate.rateOne = 0;
    rate.rateTwo = 0;
    rate.rateThree = 0;
    rate.rateFour = 0;
    rate.rateFive = 0;
    rate.rateSix = 0;
    rate.rateSeven = 0;
    rate.rateEight = 0;
    rate.rateNine = 0;
    rate.rateTen = 0;
  }

  return {
    success: true,
    rate,
  };
};

internals.get_reported_department = async (req, reply) => {
  let reports = await Rate.find({
    $and: [{ report: true }, { void: false }],
  });

  return {
    success: true,
    reports,
  };
};

internals.get_comments = async (req, reply) => {
  let comments = await Rate.find({
    $and: [
      { concern: false },
      { rate: true },
      { report: false },
      { void: false },
    ],
  });

  return {
    success: true,
    comments,
  };
};

module.exports = internals;
