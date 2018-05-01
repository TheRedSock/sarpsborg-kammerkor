//#region Dependency imports
const Validator = require('validator');
const isEmpty = require('./is-empty');
//#endregion

// Export validate login function
module.exports = function validatePracticeInput(data) {
  let errors = {}; // Initialize errors object

  // Convert data to validate into empty string if the value is empty.
  data.tag = !isEmpty(data.tag) ? data.tag : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';
  data.information = !isEmpty(data.information) ? data.information : '';

  //#region Tag validations

  // TODO: combobox validation?
  if (Validator.isEmpty(data.tag)) {
    errors.tag = 'Type felt må fylles ut.';
  }
  //#endregion

  //#region From validations
  if (Validator.isAfter(data.from, data.to)) {
    errors.from = 'Fra dato må være før til dato.';
  }

  if (Validator.isBefore(data.from, new Date().toISOString())) {
    errors.from = 'Ny øvelse må være i fremtiden.';
  }

  if (!Validator.isISO8601(data.from)) {
    errors.from = 'Fra dato felt må være en dato.';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'Fra dato felt må fylles ut';
  }
  //#endregion

  //#region To validations
  if (Validator.isBefore(data.to, data.from)) {
    errors.from = 'Til dato må være senere enn fra dato.';
  }

  if (Validator.isBefore(data.to, new Date().toISOString())) {
    errors.to = 'Ny øvelse må være i fremtiden.';
  }

  if (!Validator.isISO8601(data.to)) {
    errors.to = 'Fra dato felt må være en dato.';
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = 'Fra dato felt må fylles ut';
  }
  //#endregion

  //#region Information validations
  if (Validator.isEmpty(data.information)) {
    errors.information = 'Informasjon felt må fylles ut';
  }
  //#endregion

  // Return the errors object along with a bool saying if it's valid or not.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
