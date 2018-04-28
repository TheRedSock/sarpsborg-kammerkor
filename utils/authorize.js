module.exports = (req, acl) => {
  return acl.isAllowed(req.user.id, req.url, req.method);
};
