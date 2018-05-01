// Dependency imports
const mongoose = require('mongoose');

// Initialize Schema
const Schema = mongoose.Schema;

//#region Create Schema
const PracticeSchema = new Schema({
  tag: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    default: Date.now
  },
  to: {
    type: Date,
    default: Date.now
  },
  information: {
    type: String
  }
});
//#endregion

// Export
module.exports = Practice = mongoose.model('practices', PracticeSchema);
