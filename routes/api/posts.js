const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../models/Post");

// Post Validatoor
const validatePostInput = require("../../validation/post");

// @Route GET api/posts/test
// @Desc  Test posts route
// @acess Public
router.get("/test", (req, res) => {
  res.json({
    msg: "posts works"
  });
});

// @route  GET api/posts
// @desc   Get posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ noPostsFound: "No posts found" }));
});

// @route  GET api/posts/:post_id
// @desc   Get post by id
// @access Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: "No post found with that ID" })
    );
});

// @route  POST api/posts
// @desc   Create posts
// @access Private
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

// @route  DELETE api/posts/:post_id
// @desc   Delete post by id
// @access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (req.user.id == post.user) {
          post
            .remove()
            .then(() => res.json({ sucess: "Post deleted successfully" }));
        } else {
          return res
            .status(401)
            .json({ AuthorizationError: "User did not post the Post" });
        }
      })
      .catch(err =>
        res.status(404).json({ postNotFound: "No post found with that ID" })
      );
  }
);

module.exports = router;
