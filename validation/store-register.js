const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  // data.name = !isEmpty(data.name) ? data.name : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.countryOrState = !isEmpty(data.countryOrState) ? data.countryOrState : "";
  data.streetAddress = !isEmpty(data.streetAddress) ? data.streetAddress : "";
  data.zip = !isEmpty(data.zip) ? data.zip : "";


// Compay Info checks
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company name field is required";
  }
  if (Validator.isEmpty(data.streetAddress)) {
    errors.streetAddress = "Street Address field is required";
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  if (Validator.isEmpty(data.countryOrState)) {
    errors.countryOrState = "Countro Or State field is required";
  }
  if (Validator.isEmpty(data.zip)) {
    errors.zip = "Zip Code field is required";
  }
  if (Validator.isEmpty(data.tel)) {
    errors.tel = "Tel field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};