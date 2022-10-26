const express = require("express");
const bookmark = express.Router();

const Bookmark = require("../models/bookmarkSchema");
const User = require("../models/users");

const { protect } = require("../middleware/authMiddleware");

bookmark.get("/", (req, res) => {
  Bookmark.find({}, (err, myBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(myBookmark);
    }
  });
});

bookmark.post("/", protect, (req, res) => {
  Bookmark.create(req.body, req.user.id, (err, newBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.send(newBookmark);
    }
  });
});

bookmark.delete("/:id", protect, (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (bookmark.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  Bookmark.findByIdAndDelete(req.params.id, (err, deletedBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(deletedBookmark);
    }
  });
});

bookmark.put("/:id", protect, (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (bookmark.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
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
