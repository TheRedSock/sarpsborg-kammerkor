//#region Dependency imports
const Validator = require('validator');
const isEmpty = require('./is-empty');
//#endregion

// Export validate login function
module.exports = function validateLoginInput(data) {
  let errors = {}; // Initialize errors object

  // Convert data to validate into empty string if the value is empty.
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //#region Username validations
  // Is empty validation
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Brukernavn felt må fylles ut.';
  }
  //#endregion

  //#region Password validations
  // Is empty validation
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passord felt må fylles ut.';
  }
  //#endregion

  // Return the errors object along with a bool saying if it's valid or not.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
