//#region Dependency imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
//#endregion

// Initialize router
const router = express.Router();

//#region Load input validation
const isEmpty = require('../../validation/is-empty');
//#endregion

// Load 'Practice' model
const Practice = require('../../models/Practice');

//#region / routes
// @route  POST api/practices
// @desc   Creates a practice
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    const practiceFields = {};
    if (req.body.tag) practiceFields.tag = req.body.tag;
    if (req.body.to) practiceFields.to = req.body.to;
    if (req.body.from) practiceFields.from = req.body.from;
    if (req.body.information) practiceFields.information = req.body.information;

    // Create
    new Practice(practiceFields).save().then(practice => res.json(practice));
  }
);

// @route  PUT api/practices/:practice_id
// @desc   Updates a practice
// @access Private
router.put(
  '/:practice_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const practiceFields = {};
    if (req.body.tag) practiceFields.tag = req.body.tag;
    if (req.body.to) practiceFields.to = req.body.to;
    if (req.body.from) practiceFields.from = req.body.from;
    if (req.body.information) practiceFields.information = req.body.information;

    Practice.findOneAndUpdate(
      { _id: req.params.practice_id },
      { $set: practiceFields },
      { new: true }
    )
      .then(practice => res.json(practice))
      .catch(error =>
        res.status(404).json({ nopractice: 'Fant ingen øvelse med den IDen.' })
      );
  }
);

// @route  DELETE api/practices/:practice_id
// @desc   Delete a practice
// @access Private
router.delete(
  '/:practice_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.params.practice_id);
    Practice.findOneAndRemove({ _id: req.params.practice_id }).then(() => {
      res.json({ success: true });
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
