const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Must be at least 3 characters"],
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "B-category",
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("Category", CategorySchema);
