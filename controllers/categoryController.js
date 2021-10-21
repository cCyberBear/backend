const mongoose = require("mongoose");

const Category = require("../modeljs/category");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");

exports.createCategory = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.create({ name, description });
  res.status(201).json({
    success: true,
    data: category,
  });
});

exports.getCategory = catchAsync(async (req, res) => {
  const category = await Category.find({});
  res.json({
    success: true,
    data: category,
  });
});
