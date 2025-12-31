const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validatePassword } = require("../middleware/passwordUtil");
const db = require("../storage/queries");

function verifyCB(email, password, done) {
  db.findUserByEmail(email)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = validatePassword(password, user.hash, user.salt);
      if (!isValid) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => {
      done(err);
    });
}

const strategy = new LocalStrategy({ usernameField: "email" }, verifyCB);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.findUserByID(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
passport.use(strategy);

module.exports = passport;
