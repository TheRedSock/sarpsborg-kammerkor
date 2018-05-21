//#region Dependency imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
//#endregion

//#region Utility imports
const acl = require('../../config/acl');
const authorize = require('../../utils/authorize');
//#endregion

// Initialize router
const router = express.Router();

// Load 'Member' model
const Member = require('../../models/Member');

router.get('/', (req, res) => {
  Member.find()
    .then(members => {
      res.json(members);
    })
    .catch(err =>
      res.status(404).json({ practice: 'Det er ingen medlemmer.' })
    );
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    /*
  // Deconstruct return values from input validation on the request data.
  const { errors, isValid } = validatePracticeInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  */

    // Checks if user making request is administrator.
    authorize(req, acl).then(result => {
      if (result) {
        const memberFields = {};
        if (req.body.firstname) memberFields.firstname = req.body.firstname;
        if (req.body.lastname) memberFields.lastname = req.body.lastname;
        if (req.body.voice) memberFields.voice = req.body.voice;
        if (req.body.age) memberFields.age = req.body.age;
        if (req.body.image) memberFields.image = req.body.image;

        new Member(memberFields).save().then(member => res.json(member));
      } else {
        errors.unauthorized =
          'Din bruker har ikke rettigheter til denne operasjonen.';
        return res.status(401).json(errors);
      }
    });
  }
);

//#region Load input validation
const isEmpty = require('../../validation/is-empty');
const validatePracticeInput = require('../../validation/practice');
//#endregion

// Export the router
module.exports = router;
