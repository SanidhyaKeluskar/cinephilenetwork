const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReviewInput(data) {
  let errors = {};

  data.movieName = !isEmpty(data.movieName) ? data.movieName : "";
  data.review = !isEmpty(data.review) ? data.review : "";
  data.rating = !isEmpty(data.rating) ? data.rating : "";

  if (Validator.isEmpty(data.movieName)) {
    errors.movieName = "Movie name is required";
  }
  if (Validator.isEmpty(data.review)) {
    errors.review = "Review is required";
  }
  if (Validator.isEmpty(data.rating)) {
    errors.rating = "Rating is required";
  }
  if (!Validator.isInt(data.rating)) {
    errors.rating = "Rating has to be a number";
  }
  if (!Validator.isLength(data.review, { max: 300 })) {
    errors.name = "Review must be less than 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
