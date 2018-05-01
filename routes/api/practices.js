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

//#region Load input validation
const isEmpty = require('../../validation/is-empty');
const validatePracticeInput = require('../../validation/practice');
//#endregion

// Load 'Practice' model
const Practice = require('../../models/Practice');

//#region / routes
// @route  GET api/practices
// @desc   Gets 10 upcoming practices
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    // Find up to 10 practices starting from current date sorted by date.
    Practice.find({
      from: {
        $gte: new Date().toISOString()
      }
    })
      .sort({ from: 1 })
      .limit(10)
      .then(practices => {
        // If there are no upcoming practices.
        if (isEmpty(practices)) {
          errors.nopractice = 'Det er ingen oppkommende øvelser.';
          return res.status(400).json(errors);
        }
        // Return list of (up to 10) practices.
        return res.json(practices);
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route  POST api/practices
// @desc   Creates a practice
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Deconstruct return values from input validation on the request data.
    const { errors, isValid } = validatePracticeInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    authorize(req, acl).then(result => {
      if (result) {
        const practiceFields = {};
        if (req.body.tag) practiceFields.tag = req.body.tag;
        if (req.body.to) practiceFields.to = req.body.to;
        if (req.body.from) practiceFields.from = req.body.from;
        if (req.body.information)
          practiceFields.information = req.body.information;

        // Create
        new Practice(practiceFields)
          .save()
          .then(practice => res.json(practice));
      } else {
        errors.unauthorized =
          'Din bruker har ikke rettigheter til denne operasjonen.';
        return res.status(401).json(errors);
      }
    });
  }
);

// @route  PUT api/practices/:practice_id
// @desc   Updates a practice
// @access Private
router.put(
  '/:practice_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Deconstruct return values from input validation on the request data.
    const { errors, isValid } = validatePracticeInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    authorize(req, acl).then(result => {
      if (result) {
        const practiceFields = {};
        if (req.body.tag) practiceFields.tag = req.body.tag;
        if (req.body.to) practiceFields.to = req.body.to;
        if (req.body.from) practiceFields.from = req.body.from;
        if (req.body.information)
          practiceFields.information = req.body.information;

        Practice.findOneAndUpdate(
          { _id: req.params.practice_id },
          { $set: practiceFields },
          { new: true }
        )
          .then(practice => res.json(practice))
          .catch(error =>
            res
              .status(404)
              .json({ nopractice: 'Fant ingen øvelse med den IDen.' })
          );
      } else {
        errors.unauthorized =
          'Din bruker har ikke rettigheter til denne operasjonen.';
        return res.status(401).json(errors);
      }
    });
  }
);

// @route  DELETE api/practices/:practice_id
// @desc   Delete a practice
// @access Private
router.delete(
  '/:practice_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    authorize(req, acl).then(result => {
      if (result) {
        Practice.findOneAndRemove({ _id: req.params.practice_id }).then(() => {
          res.json({ success: true });
        });
      } else {
        errors.unauthorized =
          'Din bruker har ikke rettigheter til denne operasjonen.';
        return res.status(401).json(errors);
      }
    });
  }
);
//#endregion

//#region /all routes
// @route  GET api/practices/all
// @desc   Returns list of practices
// @access Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Practice.find()
      .then(practices => {
        if (isEmpty(practices)) {
          errors.nopractice = 'Det er ingen øvelser.';
          return res.status(404).json(errors);
        }
        res.json(practices);
      })
      .catch(err =>
        res.status(404).json({ practice: 'Det er ingen øvelser.' })
      );
  }
);
//#endregion

// Export the router
module.exports = router;
