const User = require("../modeljs/user");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MailSevice = require("../utils/MailService");
const Token = require("../modeljs/token");
const crypto = require("crypto");

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, age } = req.body;
  const user = await User.create({ name, email, password, age });
  res.status(201).json({
    success: true,
    data: user,
  });
});
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const isExisted = await User.findOne({ email });
  if (!isExisted) {
    throw new ApiError(404, "email or password is incorrect");
  }
  const isMatch = bcrypt.compareSync(password, isExisted.password);
  if (!isMatch) {
    throw new ApiError(404, "email or password is incorrect");
  }
  const token = jwt.sign(
    {
      email: isExisted.email,
      name: isExisted.name,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  res.json({
    success: true,
    token,
  });
});
exports.updatePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const email = req.user.email;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Your email does not exist anymore");
  }
  const isMatch = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiError(404, "old password does not match");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
  });
});
exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Your email does not exist");
  }
  const token = await Token.findOne({ userId: user._id });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  const link = `${process.env.MAIN_URL}user-info/password-reset/${user._id}/${token.token}`;
  res.status(200).json({
    success: true,
  });
  await MailSevice.sendMail(user.email, "Password reset", link);
});
exports.passwordReset = catchAsync(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "Invalid link or link expired");
  }
  const tokenFind = await Token.findOne({
    userId: user._id,
    token: token,
  });
  if (!token) {
    throw new ApiError(404, "Invalid link or link expired");
  }
  user.password = password;
  await user.save();
  await tokenFind.delete();
  res.status(200).json({
    success: true,
  });
});

exports.getDetail = catchAsync(async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email }).select("-password -_id");
  res.status(200).json({
    success: true,
    user,
  });
});
