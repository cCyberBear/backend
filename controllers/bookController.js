const mongoose = require("mongoose");

const Book = require("../modeljs/book");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");

exports.createBook = catchAsync(async (req, res) => {
  const { title, description, price, category } = req.body;
  const author = req.user.email;
  const book = await Book.create({
    title,
    description,
    author,
    price,
    category,
  });
  res.status(201).json({
    success: true,
    data: book,
  });
});

exports.getBook = catchAsync(async (req, res) => {
  const book = await Book.find({}).populate(
    "author-detail category",
    "name description -_id"
  );
  res.json({
    success: true,
    data: book,
  });
});
exports.getBookDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, "not found");
  }
  res.json({
    success: true,
    data: book,
  });
});

exports.updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const author = await req.user.email;
  const book = await Book.findByIdAndUpdate(
    { _id: id, author },
    { title, description, price },
    { new: true }
  );
  res.json({
    success: true,
    data: book,
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user.email;
  await Book.deleteOne({ _id: id, author });
  res.json({
    success: true,
    deleted: book,
  });
});
