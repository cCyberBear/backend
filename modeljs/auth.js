const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const AuthSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already existed"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Must be at least 6 characters"],
      maxlength: [30, "Must be less than 30 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "guest"],
      default: "guest",
    },
    age: {
      type: Number,
      required: [true, "age is required"],
    },
    books: [String],
  },
  {
    collection: "B-auths",
    timestamps: true,
  }
);

// AuthSchema.pre("updateOne", function (next) {
//   const salt = bcrypt.genSaltSync();
//   const hashedPassword = bcrypt.hashSync(this.getUpdate().password, salt);
//   this.password = hashedPassword;
//   next();
// });

AuthSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
  next();
});

mongoose.set("runValidators", true);

const auth = mongoose.model("Auth", AuthSchema);

module.exports = auth;
