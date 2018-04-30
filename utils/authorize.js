// This module checks if an authenticated user is authorized to make the request.
module.exports = (req, acl) => {
  const check = {
    id: req.user.id,
    path: req.baseUrl.split('/')[1], // Finds the root path (usually api).
    method: req.method
  };
  return acl.isAllowed(check.id, check.path, check.method);
};
