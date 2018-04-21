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
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//#endregion

// Load 'User' model
const User = require('../../models/User');

//#region /register routes
// @route  POST api/users/register
// @desc   Registers a user
// @access Public
router.post('/register', (req, res) => {
  // Deconstruct return values from input validation on the request data.
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Query the database for inputted username
  User.findOne({ username: req.body.username })
    .then(user => {
      // If user exists
      if (user) {
        errors.username = 'Brukernavnet er allerede i bruk.';
        return res.status(400).json(errors);
      } else {
        // Create new user
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          permissions: ['user']
        });

        // Encrypt the password
        bcrypt.genSalt(10, (err, salt) => {
          // Hash password with salt
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Change password to hashed password
            newUser.password = hash;
            // Save user to database
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(error));
});
//#endregion

//#region /login routes
// @route  POST api/users/login
// @desc   Login user / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  // Deconstruct return values from input validation on the request data.
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Grab login info from request body.
  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then(user => {
    // Check if user was found
    if (!user) {
      errors.username = 'Brukeren finnes ikke.';
      return res.status(404).json(errors);
    }

    // Check if user has permission
    if (user.permissions.indexOf('user') !== 1) {
      errors.permissions = 'Denne brukeren er ikke autorisert for denne siden.';
      return res.status(400).json(errors);
    }

    // Check if password is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      // If password is correct
      if (isMatch) {
        // Create user payload
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          permissions: user.permissions
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 }, // 1 Day
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Passordet var feil.';
        return res.status(400).json(errors);
      }
    });
  });
});
//#endregion

//#region /current routes
// @route  GET api/users/current
// @desc   Returns current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      permissions: req.user.permissions
    });
  }
);
//#endregion

// Export the router
module.exports = router;
