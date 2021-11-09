const catchAsync = require("../../middlewares/async");
const mysql = require("../../config/mysql");
const ApiError = require("../../utils/ApiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findByEmail, findAndUpdate } = require("../../odm/mysql");

const db = require("../../modeljs/mysql/model");
const Auth = db.auths;

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, age, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const data = await Auth.create({
    name,
    email,
    password: hashedPassword,
    age,
    role,
  });
  res.json({
    success: true,
    data,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const users = await Auth.findOne({ where: { email: email } });
  const user = users.dataValues;
  console.log(user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw new ApiError(404, `email or password is incorrect`);
  }
  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  res.json({
    success: true,
    data: token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(404, "cannot be left blank");
  }
  const email = req.user.email;
  const user = await findByEmail("auths", email);
  if (!user) {
    throw new ApiError(404, "Your email does not exist anymore");
  }
  const isMatch = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiError(404, "old password does not match");
  }
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  const data = await findAndUpdate(
    "auths", //table
    "password", //setfield
    hashedPassword, //setvalue
    "email", //condField
    email //condValue
  );
  res.status(200).json({
    success: true,
    data,
  });
});
