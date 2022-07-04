const { User, RoleDetail } = require("../models");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const userRepository = require("../repositories/user.repository");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        const userExist = await userRepository.login({ username, password });
        return done(null, userExist);
      } catch (error) {
        return done(null, false, { message: error.message });
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) =>
  done(
    null,
    await User.findByPk(id, {
      include: [
        {
          model: RoleDetail,
          as: "roles",
        },
      ],
    })
  )
);

module.exports = passport;
