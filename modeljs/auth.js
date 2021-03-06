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
    isActive: {
      type: Boolean,
      default: true,
    },
    loginAttempts: {
      type: Number,
      required: true,
      default: 0,
    },
    lockUntil: {
      type: Number,
      required: true,
      default: 0,
    },
    lastWrong: {
      type: Number,
      required: true,
      default: 0,
    },
    books: [String],
  },
  {
    collection: "B-auths",
    timestamps: true,
  }
);

AuthSchema.methods.unlockAccount = async function () {
  if (this.lockUntil && this.lockUntil <= Date.now()) {
    await this.updateOne({ isActive: true, loginAttempts: 0, lockUntil: 0 });
  }
};

AuthSchema.methods.resettingAccount = async function () {
  await this.updateOne({ isActive: true, loginAttempts: 0, lockUntil: 0 });
};
AuthSchema.methods.lockAccount = async function (time, range, seconds) {
  const miliseconds = seconds * 1000;
  const rangeSeconds = range * 1000;

  if (this.loginAttempts >= time && this.isActive === true) {
    await this.updateOne({
      isActive: false,
      lockUntil: Date.now() + miliseconds,
    });
  } else if (
    this.lastWrong !== 0 &&
    this.lastWrong + rangeSeconds < Date.now()
  ) {
    await this.updateOne({ loginAttempts: 1, lastWrong: 0 });
    return time;
  } else {
    await this.updateOne({
      loginAttempts: this.loginAttempts + 1,
      lastWrong: Date.now(),
    });
  }
  return time - this.loginAttempts;
};

AuthSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  } else {
    next();
  }
});

mongoose.set("runValidators", true);

const auth = mongoose.model("Auth", AuthSchema);

module.exports = auth;
