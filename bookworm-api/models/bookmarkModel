const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({
  title: { type: String },
  author: { type: String },
  readingStatus: { type: Boolean, required: true },
  notes: { type: String },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = { Bookmark };
