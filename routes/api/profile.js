const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
const validationProfileInput = require("../../validation/profile");

//Load Profile model
const Profile = require("../../models/Profile");
//Load User model
const User = require("../../models/User");

//@Route GET api/profile/test
//@Desc Test profile route
//@acess Public
router.get("/test", (req, res) => {
  res.json({
    msg: "profile works"
  });
});

//@Route GET api/profile
//@Desc  Get user's profile
//@acess Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No Profile found";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);

//@route  GET api/profile/handle/:handle
//@desc   Get profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Np profile found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET api/profile/user/:user_id
//@desc   Get profile by user ID
//@access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Np profile found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
//@route  POST api/profile
//@desc   Create or Edit User Profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationProfileInput(req.body);

    //Check validation
    if (!isValid) {
      //Return any erros with 400 status
      return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.aboutMe) profileFields.aboutMe = req.body.aboutMe;

    //preferredGenres - split into array
    if (typeof req.body.preferredGenres != undefined) {
      profileFields.preferredGenres = req.body.preferredGenres.split(",");
    }
    //favoriteMovies - split into array
    if (typeof req.body.favoriteMovies != undefined) {
      profileFields.favoriteMovies = req.body.favoriteMovies.split(",");
    }
    //favoriteTVSeries - split into array
    if (typeof req.body.favoriteTVSeries != undefined) {
      profileFields.favoriteTVSeries = req.body.favoriteTVSeries.split(",");
    }

    //Social
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.handle) profileFields.handle = req.body.handle;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //Check if handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle already exists";
            return res.status(400).json(errors);
          }

          //Save new Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
