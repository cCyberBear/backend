require("dotenv").config();
const express = require("express");

const conectDB = require("./config/db");
const catchError = require("./middlewares/error");
const bookRouter = require("./routes/bookRoute");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const MailSevice = require("./utils/MailService");
const scrathRoute = require("./routes/scrathRoute");
const upload = require("./middlewares/upload");
const Mongo = require("./config/db");

MailSevice.init();

const app = express();

app.use(express.json());

Mongo.conect();

app.use("/book-info", bookRouter);

app.use("/auth-info", authRouter);

app.use("/user-info", userRouter);

app.use("/category", categoryRoute);

app.use("/scrath", scrathRoute);

app.use(
  "/test",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  (req, res) => {
    if (req.file) {
      res.json({
        success: true,
        message: `upload successfully 1 file"}`,
      });
      eturn;
    }
    //req.file: 1 file
    //req.files: nhieuf files
    let len;
    //count sum items
    if (req.files.length) {
      len = req.files.length;
    } else {
      len = Object.keys(req.files).reduce((acc, val) => acc + val.length, 0);
    }

    res.json({
      success: true,
      message: `upload successfully ${len} ${len > 1 ? "files" : "file"}`,
    });
  }
);

app.use(catchError);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
