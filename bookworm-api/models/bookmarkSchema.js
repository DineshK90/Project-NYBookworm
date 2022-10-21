const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({
  title: { type: String },
  author: { type: String },
  yearPublished: { type: String },
  readingStatus: { type: Boolean, required: True },
  notes: { type: String },
});

module.exports = mongoose.model("Bookmark, bookmarkSchema");
