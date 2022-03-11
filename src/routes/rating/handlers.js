"use strict";

var internals = {};

var Rate = require("../../database/models/rate"),
  Ranking = require("../../database/models/ranking"),
  internals = {};

// ADMIN ----------

internals.rate = async (req, reply) => {
  //Get year
  const d = new Date();
  let year = d.getFullYear();
  var concern = false;
  //Check if rate is null
  if (
    req.payload.star1 == null ||
    req.payload.star2 == null ||
    req.payload.star3 == null ||
    req.payload.star4 == null ||
    req.payload.star5 == null ||
    req.payload.star6 == null ||
    req.payload.star7 == null ||
    req.payload.star8 == null ||
    req.payload.star9 == null ||
    req.payload.star10 == null ||
    req.payload.establishment == null ||
    req.payload.fullname == null
  ) {
    return {
      success: false,
      message: "Error Please fillup the form",
    };
  }
  //Check if comment is empty
  else {
    if (req.payload.rateComment == "") {
      concern = true;
    }
    var payload = {
      rate: true,
      rateComment: req.payload.rateComment,
      raterType: req.payload.raterType,
      fullname: req.payload.fullname,
      establishment: req.payload.establishment,
      rate_one: req.payload.star1,
      rate_two: req.payload.star2,
      rate_three: req.payload.star3,
      rate_four: req.payload.star4,
      rate_five: req.payload.star5,
      rate_six: req.payload.star6,
      rate_seven: req.payload.star7,
      rate_eight: req.payload.star8,
      rate_nine: req.payload.star9,
      rate_ten: req.payload.star10,
      concern: concern,
    };

    let dataTotal = await Ranking.findOne({
      $and: [{ name: req.payload.establishment }, { year: year }],
    }).lean();

    if (dataTotal != null) {
      console.log("OLLLDD");
      var input =
        parseInt(req.payload.star1) +
        parseInt(req.payload.star2) +
        parseInt(req.payload.star3) +
        parseInt(req.payload.star4) +
        parseInt(req.payload.star5) +
        parseInt(req.payload.star6) +
        parseInt(req.payload.star7) +
        parseInt(req.payload.star8) +
        parseInt(req.payload.star9) +
        parseInt(req.payload.star10);
      var total = parseInt(dataTotal.rate) + parseInt(input);
      var inc = parseInt(dataTotal.increment) + 1;
      var rankings = {
        name: req.payload.establishment,
        year: year,
        rate: total,
        increment: inc,
      };

      return Ranking.update(
        { _id: dataTotal._id },
        {
          $set: rankings,
        }
      ).then((data) => {
        var rate = new Rate(payload);
        return rate.save().then((data) => {
          return {
            success: true,
            message: "Successfully rated.",
          };
        });
      });
    } else {
      //New establishment and year
      console.log("NEWWWWW");
      var input =
        parseInt(req.payload.star1) +
        parseInt(req.payload.star2) +
        parseInt(req.payload.star3) +
        parseInt(req.payload.star4) +
        parseInt(req.payload.star5) +
        parseInt(req.payload.star6) +
        parseInt(req.payload.star7) +
        parseInt(req.payload.star8) +
        parseInt(req.payload.star9) +
        parseInt(req.payload.star10);
      var inc = 1;
      var rankings = {
        name: req.payload.establishment,
        year: year,
        rate: input,
        increment: inc,
      };
      console.log(input, "=========", rankings.rate);
      var rateTotal = new Ranking(rankings);

      return rateTotal.save().then((data) => {
        var rate = new Rate(payload);
        rate.save().then((data) => {
          return {
            success: true,
            message: "Successfully Rated",
          };
        });
      });
    }
  }
};

internals.report = (req, reply) => {
  var payload = req.payload;
  payload.report = true;
  var rate = new Rate(payload);
  return rate.save().then((data) => {
    return {
      success: 200,
      message: "Successfully Reported",
    };
  });
};

module.exports = internals;
