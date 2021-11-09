const Mongo = require("../config/db");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError.js");

exports.getFile = catchAsync(async (req, res, next) => {
  const { filename } = req.params;
  Mongo.gridfs.find({ filename }).toArray((err, files) => {
    if (err || !files || !files.length) {
      return next(new ApiError(404, "file is not found"));
    }
    Mongo.gridfs.openDownloadStreamByName(filename).pipe(res);
  });
});
