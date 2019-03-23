const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.preferredGenres = !isEmpty(data.preferredGenres)
    ? data.preferredGenres
    : "";
  data.favoriteMovies = !isEmpty(data.favoriteMovies)
    ? data.favoriteMovies
    : "";
  data.favoriteTVSeries = !isEmpty(data.favoriteTVSeries)
    ? data.favoriteTVSeries
    : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Length of handle should be betwen 2 and 40";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle Field required";
  }

  if (Validator.isEmpty(data.preferredGenres)) {
    errors.preferredGenres = "Preferred genres is required";
  }
  if (Validator.isEmpty(data.favoriteMovies)) {
    errors.favoriteMovies = "Favorite Movies list is required";
  }
  if (Validator.isEmpty(data.favoriteTVSeries)) {
    errors.favoriteTVSeries = "Favorite TV Series list is required";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
