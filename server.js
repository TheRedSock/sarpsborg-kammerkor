//#region Dependency imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//#endregion

// Define express app
const app = express();

//#region Database config
// The keys.js file is ignored to hide sensitive strings.
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected.');
    // Configure ACL after database connected.
    let acl = require('./config/acl');
    // Tell the app it's ready to continue setting up the server.
    app.emit('ready');
  })
  .catch(err => console.log(err));
//#endregion

// Continue setting up the server after database has loaded.
app.on('ready', () => {
  //#region Route files
  const users = require('./routes/api/users');
  const practices = require('./routes/api/practices');
  const members = require('./routes/api/members');
  //#endregion

  //#region Body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  //#endregion

  //#region Passport middleware
  app.use(passport.initialize());

  // Passport config
  require('./config/passport')(passport);
  //#endregion

  //#region Use Routes
  app.use('/api/users', users);
  app.use('/api/practices', practices);
  app.use('/api/members', members);
  //#endregion

  //#region Start server
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}.`));
  //#endregion
});
