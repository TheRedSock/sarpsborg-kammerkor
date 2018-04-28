const node_acl = require('acl');
const mongoose = require('mongoose');

let aclBackend = new node_acl.mongodbBackend(
  mongoose.connection.db,
  'acl',
  true
);
let acl = new node_acl(aclBackend);
setRoles();

function setRoles() {
  // Create access roles
  acl.allow('user', 'intern', 'view');
  acl.allow('admin', 'admin', '*');
  acl.allow('test', '/current', '*');
  // Add users to roles
  acl.addUserRoles('sarpsborg', 'user');
  acl.addUserRoles('theredsock', 'admin');
  acl.addUserRoles('5adb9bbc0a2efc18ec89aa6b', 'test');
  // Create hierarchy
  acl.addRoleParents('admin', 'user');

  acl.isAllowed('5adb9bbc0a2efc18ec89aa6b', '/current', 'get', (err, res) => {
    if (res) {
      console.log('IS allowed');
    } else {
      console.log('not allowed');
    }
  });
}

module.exports = acl;
