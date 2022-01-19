require("dotenv").config();
const express = require("express");
const cors = require("cors");

const catchError = require("./middlewares/error");
const bookRouter = require("./routes/bookRoute");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const fileRouter = require("./routes/fileRoute");
const categoryRoute = require("./routes/categoryRoute");
const MailSevice = require("./utils/MailService");
const scrathRoute = require("./routes/scrathRoute");
const uploadMongo = require("./middlewares/uploadMongo");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const Mongo = require("./config/db");

const mysql_userRouter = require("./routes/mysql/userRoute");
const mysql_authRouter = require("./routes/mysql/authRoute");
const mysql_bookRouter = require("./routes/mysql/bookRoute");

const db = require("./modeljs/mysql/model");

const options = require("./swagger/options");
db.sequelize.sync();

MailSevice.init();

const app = express();

app.use(express.json());

app.use(cors());

Mongo.conect();
const specify = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specify));

app.use("/book-info", bookRouter);
app.use("/auth-info", authRouter);
app.use("/user-info", userRouter);
app.use("/file", fileRouter);
app.use("/category", categoryRoute);
app.use("/scrath", scrathRoute);

app.use("/api/v1/mysql/user", mysql_userRouter);
app.use("/api/v1/mysql/auth", mysql_authRouter);
app.use("/api/v1/mysql/book", mysql_bookRouter);

app.use(
  "/test",
  uploadMongo.fields([
    { name: "avatar", maxCount: 2 },
    { name: "image", maxCount: 2 },
  ]),
  async (req, res) => {
    if (req.file) {
      return res.json({
        success: true,
        message: `upload successfully 1 file"}`,
      });
    }
    //req.file: 1 file
    //req.files: nhieuf files
    let len;
    //count sum items
    if (req.files.length) {
      len = req.files.length;
    } else {
      len = Object.keys(req.files).reduce(
        (acc, val) => acc + req.files[val].length,
        0
      );
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
