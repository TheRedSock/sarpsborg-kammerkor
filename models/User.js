// Dependency imports
const mongoose = require('mongoose');

// Initialize Schema
const Schema = mongoose.Schema;

//#region Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});
//#endregion

// Export
module.exports = User = mongoose.model('users', UserSchema);
