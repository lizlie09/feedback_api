"use strict";

var internals = {};

const User = require("../../database/models/User");
const Crypto = require("../../lib/Crypto");
const jwt = require("jsonwebtoken");
const Config = require("../../config");

// ADMIN ----------

internals.login = (req, reply) => {
  let email = req.payload.email;
  let password = req.payload.password;

  return User.findOne({ email })
    .lean()
    .then((data) => {
      if (!data) {
        return {
          success: false,
          message: "Email not found",
        };
      }

      if (req.payload.mode === "assigned-officer" && !data.name) {
        return {
          success: false,
          message: "Your account is not an assigned officer.",
        };
      }

      if (Crypto.decrypt(data.password) === password) {
        let user = { ...data };
        return {
          success: true,
          token: jwt.sign(user, Config.crypto.privateKey),
          user,
        };
      } else {
        return {
          success: false,
          message: "Wrong password!",
        };
      }
    })
    .catch((err) => {
      console.log(err);
      return {
        success: false,
        message: "An error occurred",
      };
    });
};

internals.signup = async (req, reply) => {
  var payload = {
    firstname: req.payload.firstname,
    lastname: req.payload.lastname,
    middlename: req.payload.middlename,
    email: req.payload.email,
    password: Crypto.encrypt(req.payload.password),
    scope: ["visitor"],
  };
  let user = await User.findOne({ email: req.payload.email }).lean();

  if (user) {
    return {
      success: false,
      message: "Email already exists!",
    };
  } else {
    var newUser = new User(payload);
    return newUser.save().then((data) => {
      return {
        success: true,
        message: `Hello
          ${req.payload.lastname}
          ${req.payload.firstname} you have successfully registered! Please sign in to continue`,
      };
    });
  }
};

internals.add_admin = async (req, reply) => {
  let { email, role } = req.payload;

  let user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (user.scope.includes(role)) {
    return {
      success: false,
      message: "User already an admin.",
    };
  }

  user.scope.push(role);
  return user.save().then((data) => {
    return {
      success: true,
      message: "Successfully added as admin.",
    };
  });
};

internals.remove_scope = (req, reply) => {
  let { email, role } = req.query;
  return User.updateOne({ email }, { $pull: { scope: role } })
    .then((data) => {
      return {
        success: true,
        message: "User removed as admin",
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        success: false,
        message: "An error occurred",
      };
    });
};

module.exports = internals;
