const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    collection: "B-token",
    timestamps: true,
  }
);

tokenSchema.index(
  { createAt: 1 },
  { expireAfterSeconds: +process.env.TOKEN_EXPIRED }
);
module.exports = mongoose.model("token", tokenSchema);
