const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2 })) {
    errors.name = "Name must be atleast 2 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field required";
  }

  if (Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = "Password must be between 6 & 15 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Confirm password field must match password field";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};