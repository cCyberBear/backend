const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Must be at least 3 characters"],
    },
    description: {
      type: String,
    },
    author: {
      type: String,
      // required: [true, "Author is required"],
      // minlength: [3, "Must be at least 3 characters"],
    },
    price: {
      type: Number,
      required: [true, "Title is required"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    collection: "B-books",
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

BookSchema.virtual("author-detail", {
  ref: "Auth",
  localField: "author",
  foreignField: "email",
  justOne: true,
});
mongoose.set("runValidators", true);

module.exports = mongoose.model("Book", BookSchema);
