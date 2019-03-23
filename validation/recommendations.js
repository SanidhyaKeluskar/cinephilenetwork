const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRecommendationInput(data) {
  let errors = {};

  data.movieName = !isEmpty(data.movieName) ? data.movieName : "";

  if (Validator.isEmpty(data.movieName)) {
    errors.movieName = "Movie name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
