const express = require("express");
const Bookmark = require("../models/bookmarkSchema");
// const User = require("../models/userSchema");

const bookmarks = express.Router();

// const protect = require("../middleware/authMiddleware");

// for test, use " curl -X POST -H "Content-Type:application/json" -d '{"name":"Deepavali"}' http://localhost:3003/bookmarks "
// curl -X POST -H "Content-Type:application/json" -d '{"title":"Brothers of the Snake","author":"Dan Abnett"}' http://localhost:3003/bookmarks
// curl -X DELETE http://localhost:3003/bookmarks/6359fc093773493c04f8ad49
// curl -X PUT -H "Content-Type:application/json" -d '{"title":"Brothers of the Snake","author":"Dan Abnett","publisher":"Games Workshop","image":"https://i.imgur.com/1vSi8wA.jpg"}' http://localhost:3003/bookmarks/6359fe723bf3df39d02c562a

// TO read/retrieve
bookmarks.get("/", (req, res) => {
  Bookmark.find({}, (err, myBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(myBookmark);
    }
  });
});

// TO post
bookmarks.post("/", (req, res) => {
  Bookmark.create(req.body, (err, newBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.send(newBookmark);
    }
  });
});

// TO delete
bookmarks.delete("/:id", (req, res) => {
  Bookmark.findByIdAndDelete(req.params.id, (err, deletedBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(deletedBookmark);
    }
  });
});

// TO update
bookmarks.put("/:id", (req, res) => {
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

module.exports = bookmarks;


/* --- ORIGINAL WITH PROTECT

bookmarks.post("/", protect, (req, res) => {
  Bookmark.create(req.body, req.user.id, (err, newBookmark) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.send(newBookmark);
    }
  });
});

bookmarks.delete("/:id", protect, (req, res) => {
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

bookmarks.put("/:id", protect, (req, res) => {
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

*/