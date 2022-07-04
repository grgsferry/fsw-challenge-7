const { User, RoleDetail } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  authenticatedOnly: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.json({ message: "Error, not authenticated." });
  },
  authorizedOnly: (roleName) => (req, res, next) => {
    const currentRoles = req.user.roles.map((role) => role.details);
    if (currentRoles.includes(roleName)) {
      next();
    } else {
      res.json({ message: "Error, not authorized." });
    }
  },
  jwtAuthentication: async (req, res, next) => {
    req.isAuthenticated = () => {
      return req.user !== undefined;
    };
    if (!req.headers["authorization"]) {
      res.status(403).json({ error: "Token required" });
      return;
    }
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({ error: "Token invalid" });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN, {
        ignoreExpiration: false,
      });

      const user = await User.findByPk(Number(decoded.sub), {
        include: [
          {
            model: RoleDetail,
            as: "roles",
          },
        ],
      });
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};
