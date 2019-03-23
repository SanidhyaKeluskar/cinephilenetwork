const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSChema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  preferredGenres: {
    type: [String],
    required: true
  },
  favoriteMovies: {
    type: [String],
    required: true
  },
  favoriteTVSeries: {
    type: [String],
    required: true
  },
  aboutMe: {
    type: String
  },
  reviews: [
    {
      movieName: {
        type: String,
        required: true
      },
      review: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  recommendations: [
    {
      movieName: {
        type: String,
        required: true
      },
      comment: {
        type: String
      }
    }
  ],
  social: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSChema);
