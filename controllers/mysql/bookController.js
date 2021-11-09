const catchAsync = require("../../middlewares/async");
const mysql = require("../../config/mysql");
const ApiError = require("../../utils/ApiError");
const { insertBook, sellectAll } = require("../../odm/mysql");

const db = require("../../modeljs/mysql/model");
const Book = db.books;

exports.createBook = catchAsync(async (req, res, next) => {
  const { title, description, author, price, category } = req.body;
  //   const author = req.user.email;

  const data = await Book.create({
    title,
    description,
    author,
    price,
    category,
  });

  res.json({
    success: true,
    data,
  });
});
exports.getAllBook = catchAsync(async (req, res, next) => {
  const data = await Book.findAll();
  res.json({
    success: true,
    data,
  });
});
exports.updateBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Book.update(req.body, { where: { id: id } });
  res.json({
    success: true,
  });
});
exports.deleteBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Book.destroy({ where: { id: id } });
  res.json({
    success: true,
  });
});
