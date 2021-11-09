const catchAsync = require("../../middlewares/async");
const mysql = require("../../config/mysql");
const ApiError = require("../../utils/ApiError");

exports.getAll = catchAsync(async (req, res, next) => {
  mysql.query(`SELECT * FROM users`, (error, results, fields) => {
    if (error) {
      return next(new ApiError(400, "Error"));
    }
    res.json({
      success: true,
      data: results,
    });
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { first_name, last_name, email, country, age, gender } = req.body;
  mysql.query(
    `INSERT INTO users (first_name, last_name, email, country, age, gender) VALUES(?,?,?,?,?,?)`,
    [first_name, last_name, email, country, age, gender],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return next(new ApiError(400, "Error"));
      }
      res.json({
        success: true,
        data: results,
      });
    }
  );
});
