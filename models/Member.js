// Dependency imports
const mongoose = require('mongoose');

// Initialize Schema
const Schema = mongoose.Schema;

//#region Create Schema
const MemberSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    require: true
  },
  voice: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  image: {
    type: String
  }
});
//#endregion

// Export
module.exports = Member = mongoose.model('members', MemberSchema);
