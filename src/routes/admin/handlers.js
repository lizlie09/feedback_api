"use strict";

var internals = {};

var Rate = require("../../database/models/Ratings"),
  internals = {};
var User = require("../../database/models/Users");
var Ranking = require("../../database/models/Rankings");
var Crypto = require("../../lib/Crypto");
var moment = require("moment");

const getDateFilter = (overallFilter) => {
  let { type, year, month, startMonth, endMonth } = JSON.parse(overallFilter);
  if (type === "month") {
    let startOfMonth = new Date(`${year}-${month}-01`);
    let endOfMonth = new Date(
      `${year}-${month}-${new Date(year, month, 0).getDate()}`
    );
    endOfMonth.setHours(23, 59, 59, 999);
    // return {
    //   $match: {
    //     createdAt: { $gte: startOfMonth, $lt: endOfMonth },
    //   },
    // };
    return [startOfMonth, endOfMonth];
  }

  if (type === "quarter") {
    let startOfQuarter = new Date(`${year}-${startMonth}-01`);
    let endOfQuarter = new Date(
      `${year}-${endMonth}-${new Date(year, endMonth, 0).getDate()}`
    );
    endOfQuarter.setHours(23, 59, 59, 999);
    // return {
    //   $match: {
    //     createdAt: { $gte: startOfQuarter, $lt: endOfQuarter },
    //   },
    // };
    return [startOfQuarter, endOfQuarter];
  }

  if (type === "year") {
    let startOfYear = new Date(`${year}-01-01`);
    let endOfYear = new Date(`${year}-12-${new Date(year, 12, 0).getDate()}`);
    endOfYear.setHours(23, 59, 59, 999);
    console.log(startOfYear, endOfYear);
    // return {
    //   $match: {
    //     createdAt: { $gte: startOfYear, $lt: endOfYear },
    //   },
    // };
    return [startOfYear, endOfYear];
  }
};

internals.get_ratertypes = async (req, reply) => {
  let { establishment, overallFilter } = req.query;

  let query = [
    {
      $group: {
        _id: "$fullname",
        raterType: { $push: "$raterType" },
      },
    },
    {
      $group: {
        _id: { $first: "$raterType" },
        total: { $sum: 1 },
      },
    },
  ];

  if (establishment) {
    query.unshift({
      $match: {
        establishment,
      },
    });
  }

  if (overallFilter) {
    let dateFilter = getDateFilter(overallFilter);
    query.unshift({
      $match: {
        createdAt: { $gte: dateFilter[0], $lt: dateFilter[1] },
      },
    });
  }

  let raterTypes = await Rate.aggregate(query);

  return {
    success: true,
    raterTypes,
  };
};

internals.get_performance = async (req, reply) => {
  let query = [{ report: false }, { rate: true }, { void: false }];
  let { startDate, endDate, overallFilter, establishment } = req.query;

  if (startDate || endDate) {
    var start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    var end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    query.push({ createdAt: { $gte: start, $lt: end } });
  }

  let rate = {};
  var condition = {
    $and: query,
  };

  let aggregate = [
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
  ];

  if (overallFilter) {
    var dateFilter = getDateFilter(overallFilter);
    aggregate.unshift({
      $match: {
        createdAt: { $gte: dateFilter[0], $lt: dateFilter[1] },
      },
    });
  }

  if (establishment) {
    aggregate.unshift({
      $match: {
        establishment,
      },
    });
  }

  let performance = await Rate.aggregate(aggregate);

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
  let { remarks, establishment, createdAt, overallFilter, pageSize, current } =
    req.query;
  let query = [{ report: true }, { void: false }];
  if (remarks) {
    query.push({ remarks });
  }

  if (establishment) {
    query.push({ establishment });
  }

  if (createdAt) {
    query.push({
      $expr: {
        $eq: [
          createdAt,
          {
            $dateToString: { date: "$createdAt", format: "%Y-%m-%d" },
          },
        ],
      },
    });
  }

  if (overallFilter) {
    let dateFilter = getDateFilter(overallFilter);
    query.unshift({
      createdAt: { $gte: dateFilter[0], $lt: dateFilter[1] },
    });
  }

  let total = await Rate.countDocuments({
    $and: query,
  });
  let reports = await Rate.find({
    $and: query,
  })
    .limit(parseInt(pageSize, 10))
    .skip((parseInt(current, 10) - 1) * parseInt(pageSize, 10));

  return {
    success: true,
    reports,
    total,
  };
};

internals.get_respondents = async (req, reply) => {
  let { raterType, establishment, createdAt } = req.query;
  let query = [];

  if (raterType) {
    query.push({ raterType });
  }

  if (establishment) {
    query.push({ establishment });
  }

  if (createdAt) {
    query.push({
      $expr: {
        $eq: [
          createdAt,
          {
            $dateToString: { date: "$createdAt", format: "%Y-%m-%d" },
          },
        ],
      },
    });
  }

  let respondents = await Rate.find(query.length === 0 ? {} : { $and: query });

  return {
    success: true,
    respondents,
  };
};

internals.get_pending_resolved = async (req, reply) => {
  let { establishment, overallFilter } = req.query;

  let query = [
    {
      $match: {
        report: true,
      },
    },
    {
      $group: {
        _id: "$establishment",
        resolved: {
          $sum: {
            $cond: { if: { $eq: ["$remarks", true] }, then: 1, else: 0 },
          },
        },
        pending: {
          $sum: {
            $cond: { if: { $eq: ["$remarks", false] }, then: 1, else: 0 },
          },
        },
      },
    },
  ];

  if (establishment) {
    query.unshift({
      $match: {
        establishment,
      },
    });
  }

  if (overallFilter) {
    let dateFilter = getDateFilter(overallFilter);
    query.unshift({
      $match: {
        createdAt: { $gte: dateFilter[0], $lt: dateFilter[1] },
      },
    });
  }

  let categorizedRemarks = await Rate.aggregate(query);

  return {
    success: true,
    categorizedRemarks,
  };
};

internals.count_reports_by_category = async (req, reply) => {
  let { establishment, overallFilter } = req.query;

  let reports = [
    "Refusal To Obey Legitimate Management Instructions",
    "Negligence In Performance Of Duties",
    "Absenteeism And Leaving The Workplace Without Permission",
    "Misconduct In Relationships With Fellow Employees Or Clients In The Public",
    "Damage To Council Property",
    "Swearing Or Verbal Abuse Of Fellow Employees Or Client In The Public",
    "Unauthorized Use Of Councils Facilities ( Ex. Tools, Equipment's And Vehicles)",
  ];

  let countPerCategory = [];

  for (const i in reports) {
    let query = {
      reports: reports[i],
    };
    if (establishment) {
      query.establishment = establishment;
    }
    if (overallFilter) {
      let dateFilter = getDateFilter(overallFilter);
      query.createdAt = { $gte: dateFilter[0], $lt: dateFilter[1] };
    }
    let count = await Rate.countDocuments(query);

    countPerCategory.push({ label: reports[i], count });
  }

  return {
    success: true,
    countPerCategory,
  };
};

internals.reply_report = function (req, reply) {
  var payload = {
    ...req.payload,
  };
  return Rate.update(
    { _id: req.payload._id },
    {
      $set: payload,
    }
  ).then((data) => {
    return {
      success: true,
      message: "Successfully updated",
    };
  });
};

internals.get_assignedoffice_comments = async (req, reply) => {
  let { officeName, remarks, createdAt, pageSize, current, overallFilter } =
    req.query;

  let query = [
    {
      establishment: officeName,
    },
  ];

  if (remarks) {
    query.push({ remarks });
  }

  if (createdAt) {
    query.push({
      $expr: {
        $eq: [
          createdAt,
          {
            $dateToString: { date: "$createdAt", format: "%Y-%m-%d" },
          },
        ],
      },
    });
  }

  if (overallFilter) {
    let dateFilter = getDateFilter(overallFilter);
    query.unshift({
      createdAt: { $gte: dateFilter[0], $lt: dateFilter[1] },
    });
  }

  let total = await Rate.countDocuments({ $and: query });
  let comments = await Rate.find({ $and: query })
    .limit(parseInt(pageSize, 10))
    .skip((parseInt(current, 10) - 1) * parseInt(pageSize, 10));

  return {
    success: true,
    comments,
    total,
  };
};

internals.get_comments = async (req, reply) => {
  let { remarks, establishment, createdAt, overallFilter, pageSize, current } =
    req.query;

  let query = [
    { concern: false },
    { rate: true },
    { report: false },
    { void: false },
  ];

  if (remarks) {
    query.push({ remarks });
  }

  if (createdAt) {
    query.push({
      $expr: {
        $eq: [
          createdAt,
          {
            $dateToString: { date: "$createdAt", format: "%Y-%m-%d" },
          },
        ],
      },
    });
  }

  if (overallFilter) {
    let dateFilter = getDateFilter(overallFilter);
    query.unshift({
      createdAt: { $gte: dateFilter[0], $lt: dateFilter[1] },
    });
  }

  let total = await Rate.countDocuments({
    $and: query,
  });
  let comments = await Rate.find({
    $and: query,
  })
    .limit(parseInt(pageSize, 10))
    .skip((parseInt(current, 10) - 1) * parseInt(pageSize, 10));

  return {
    success: true,
    comments,
    total,
  };
};

internals.get_offices = async (req, reply) => {
  let offices = await User.find({
    $and: [{ void: false }, { isEstablishment: true }],
  }).lean();

  return { success: true, offices };
};

internals.create_office = async (req, reply) => {
  var payload = {
    name: req.payload.name,
    firstname: req.payload.firstname,
    lastname: req.payload.lastname,
    middlename: req.payload.middlename,
    email: req.payload.email,
    password: Crypto.encrypt(req.payload.password),
    scope: ["establishment"],
    isEstablishment: true,
  };
  return User.findOne({ email: req.payload.email })
    .lean()
    .then((data) => {
      if (data != null) {
        return {
          success: false,
          message: "Email already exists",
        };
      } else {
        var user = new User(payload);
        return user.save().then((data) => {
          return {
            success: true,
            message: "Successfully created.",
          };
        });
      }
    });
};

internals.edit_office = (req, reply) => {
  var payload = {
    name: req.payload.name,
    firstname: req.payload.firstname,
    lastname: req.payload.lastname,
    middlename: req.payload.middlename,
    email: req.payload.email,
  };

  console.log(req.payload);
  if (req.payload.name == "") {
    return User.remove({ _id: req.payload._id }, {}).then((data) => {
      return {
        success: true,
        message: "Successfully Removed",
      };
    });
  } else {
    return User.updateOne({ _id: req.payload._id }, payload).then((data) => {
      return {
        success: true,
        message: "Successfully Updated!",
      };
    });
  }
};

internals.get_rankings = async (req, reply) => {
  let { year } = req.query;

  let query = {};

  if (year) {
    query = { ...query, year };
  }

  let rankings = await Ranking.find(query).lean();

  return {
    success: true,
    rankings,
  };
};

internals.get_admins = async (req, reply) => {
  let admins = await User.find({ scope: "admin" }).catch((err) => {
    console.log(err);
    return {
      success: false,
      message: "Server error",
    };
  });

  return {
    success: true,
    admins,
  };
};

module.exports = internals;
