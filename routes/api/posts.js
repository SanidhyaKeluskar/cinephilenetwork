const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../models/Post");

// Post Validatoor
const validatePostInput = require("../../validation/post");

//@Route GET api/posts/test
//@Desc Test posts route
//@acess Public
router.get("/test", (req, res) => {
  res.json({
    msg: "posts works"
  });
});

//@Route POST api/posts
//@Desc  Create posts
//@acess Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
      //Return any erros with 400 status
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
