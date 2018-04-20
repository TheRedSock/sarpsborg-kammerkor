//#region Dependency imports
const Validator = require('validator');
const isEmpty = require('./is-empty');
//#endregion

// Export validate login function
module.exports = function validateRegisterInput(data) {
  let errors = {}; // Initialize errors object

  // Convert data to validate into empty string if the value is empty.
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirm = !isEmpty(data.confirm) ? data.confirm : '';

  //#region Username validations
  // String length validation
  if (!Validator.isLength(data.username, { min: 4, max: 30 })) {
    errors.username = 'Brukernavn må være imellom 4 og 30 karakterer.';
  }
  // Is empty validation
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Brukernavn felt må fylles ut.';
  }
  //#endregion

  //#region Password validations
  // String length validation
  if (!Validator.isLength(data.confirm, { min: 6, max: 30 })) {
    errors.confirm = 'Passord må være mellom 6 og 30 karakterer.';
  }

  if (Validator.isEmpty(data.confirm)) {
    errors.confirm = 'Passord felt må fylles ut.';
  }
  //#endregion

  //#region Confirm password validations
  // Password match validation
  if (!Validator.equals(data.password, data.confirm)) {
    errors.password = 'Passordene må være like.';
  }
  // String length validation
  if (Validator.isEmpty(data.confirm)) {
    errors.confirm = 'Bekreft passord felt må fylles ut.';
  }
  //#endregion

  // Return the errors object along with a bool saying if it's valid or not.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
