const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");

const fileFilter = (req, file, cb) => {
  //check extension trc khi upload
  const allowed = [".jpg", ".png", ".gif", ".jpeg"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowed.join("|")})$`, "i");

  if (regex.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("file extension is noy allow"), false);
  }
};

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
});

const mongoUpload = multer({ storage, fileFilter });
module.exports = uploadMongo;
