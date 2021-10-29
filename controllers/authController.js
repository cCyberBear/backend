const Auth = require("../modeljs/auth");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MailSevice = require("../utils/MailService");
const Token = require("../modeljs/token");
const crypto = require("crypto");
const Book = require("../modeljs/book");
const User = require("../modeljs/user");

const url = require("url");

const createPassword = require("../utils/CreatePassword");

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, age, role } = req.body;
  const auth = await Auth.create({ name, email, password, age, role });
  res.status(201).json({
    success: true,
    data: auth,
  });
});
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const isExisted = await Auth.findOne({ email });

  if (!isExisted) {
    throw new ApiError(400, "email or password is incorrect");
  }
  await isExisted.unlockAccount();

  if (!isExisted.isActive) {
    throw new ApiError(400, "try again later");
  }

  const isMatch = bcrypt.compareSync(password, isExisted.password);
  if (!isMatch) {
    const timeLeft = await isExisted.lockAccount(5, 10, 60);
    throw new ApiError(
      404,
      `email or password is incorrect, You have ${timeLeft} left`
    );
  }
  await isExisted.resettingAccount();

  const token = jwt.sign(
    {
      email: isExisted.email,
      name: isExisted.name,
      role: isExisted.role,
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
  const user = await Auth.findOne({ email });

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
  const user = await Auth.findOne({ email });
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

  const link = `${process.env.MAIN_URL}auth-info/password-reset/${user._id}/${token.token}`;

  await MailSevice.sendMail(user.email, "Password reset", link);
  res.status(200).json({
    success: true,
  });
});
exports.passwordReset = catchAsync(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await Auth.findById(id);
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
exports.delete = catchAsync(async (req, res) => {
  const thisemail = req.user.email;
  await Book.deleteMany({ author: thisemail });
  await Auth.deleteOne({ email: thisemail });
  res.json({
    success: true,
  });
});
exports.random = catchAsync(async (req, res) => {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  const password = createPassword(
    +query.amount,
    +query.capital,
    +query.normal,
    +query.number,
    +query.symbol
  );
  res.json({
    password,
  });
});

//admin with user
exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const emailDelete = await User.findById({ id });
  if (!emailDelete) {
    throw new ApiError(400, "not be empty");
  }
  await User.deleteOne({ email: emailDelete });
  res.json({
    success: true,
  });
});
exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({
    success: true,
    data: users,
  });
});
exports.addUser = catchAsync(async (req, res) => {
  const { name, email, age } = req.body;
  var randomstring = Math.random().toString(36).slice(-10);
  const user = await User.create({ name, email, password: randomstring, age });
  await MailSevice.sendMail(
    user.email,
    "Your new account",
    `Use your email with below password to login: ${randomstring}`
  );
  res.status(200).json({
    success: true,
  });
});
exports.updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  const user = await User.findById(id);

  const userUpdate = await User.findByIdAndUpdate(
    { _id: id },
    { name, email, age },
    { new: true }
  );
  res.json({
    success: true,
    data: userUpdate,
  });
});
