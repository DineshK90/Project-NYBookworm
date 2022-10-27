const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  publisher: { type: String },
  summary: { type: String },
  readingStatus: { type: String, default: 'Not Yet Read'},
  notes: { type: String },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = Bookmark