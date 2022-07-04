module.exports = {
  authenticatedOnly: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  },
  guestOnly: (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect("/web/home");
  },
  authorizedOnly: (roleName) => (req, res, next) => {
    const currentRoles = req.user.roles.map((role) => role.details);
    if (currentRoles.includes(roleName)) {
      next();
    } else {
      res.redirect("/web/home");
    }
  },
};
