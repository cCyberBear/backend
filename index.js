require("dotenv").config();
const express = require("express");

const conectDB = require("./config/db");
const catchError = require("./middlewares/error");
const bookRouter = require("./routes/bookRoute");
const authRouter = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const MailSevice = require("./utils/MailService");
const scrathRoute = require("./routes/scrathRoute");
const { limiter } = require("./middlewares/rateLimit");

MailSevice.init();

const app = express();

app.use(express.json());

conectDB();

app.use("/book-info", bookRouter);

app.use("/auth-info", authRouter);

app.use("/category", categoryRoute);

app.use("/scrath", scrathRoute);

app.use(catchError);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
