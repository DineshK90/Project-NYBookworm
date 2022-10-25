const express = require("express");
const bookmark = express.Router();

const Bookmark = require("../models/bookmarkSchema");
const User = require("../models/users");

bookmark.get("/", (req, res) => {
  Bookmark.find({}, (err, myBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(myBookmark);
    }
  });
});

bookmark.post("/", (req, res) => {
  Bookmark.create(req.body, (err, newBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.send(newBookmark);
    }
  });
});

bookmark.delete("/:id", (req, res) => {
  Bookmark.findByIdAndDelete(req.params.id, (err, deletedBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(deletedBookmark);
    }
  });
});

bookmark.put("/:id", (req, res) => {
  Bookmark.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBookmark) => {
      if (err) {
        res.status(400).json({ err: err.message });
      } else {
        res.status(200).json(updatedBookmark);
      }
    }
  );
});

module.exports = bookmark;
