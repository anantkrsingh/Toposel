const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const { check } = require("express-validator");

exports.requireSignIn = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
  } else {
    console.log("JWT Error");
    return res.status(401).json({ message: "Auth Required" });
  }
  next();
};

exports.validateLogin = [
  check("identifier").notEmpty().withMessage("Email or username is Required"),
  check("password").notEmpty().withMessage("Password is Required"),
];

exports.validateRegister = [
  check("userName").notEmpty().withMessage("Username is Required"),
  check("name").notEmpty().withMessage("Name is Required"),
  check("email").isEmail().notEmpty().withMessage("Email is Required"),
  check("password").notEmpty().withMessage("password is Required"),
  check("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),
  check("dob")
    .notEmpty()
    .withMessage("DOB is Required")
    .isISO8601().toDate()
    .withMessage("Invalid DOB format"),
  check("country").notEmpty().withMessage("Country is Required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    console.log(errors);
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};
