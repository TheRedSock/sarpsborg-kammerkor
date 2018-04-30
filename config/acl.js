//#region Dependency imports
const node_acl = require('acl');
const mongoose = require('mongoose');
//#endregion

// Set up MongoDB backend for ACL.
let aclBackend = new node_acl.mongodbBackend(
  mongoose.connection.db,
  'acl',
  true
);
// Initialize ACL.
let acl = new node_acl(aclBackend);

// Setup initial roles.
setRoles();

function setRoles() {
  // Allow admin role to do everything in the API.
  acl.allow([
    {
      roles: ['admin'],
      allows: [{ resources: 'api', permissions: '*' }]
    }
  ]);

  // Initial user that has full API access.
  acl.addUserRoles('5ada599252cd8628f8fd5f63', 'admin');
}

module.exports = acl;
