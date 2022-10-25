const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Input Username"],
    },
    email: {
      type: String,
      required: [true, "Input Email"],
    },
    password: {
      type: String,
      required: [true, "Input Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
