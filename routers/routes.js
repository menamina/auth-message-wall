const { Router } = require("express");
const passport = require("passport");
const router = Router();
const home = require("../controls/home");
const validateSignUp = require("../middleware/validators");

router.get("/", home.homePageView);
router.get("/login-signup", home.loginSignUp);

router.post("/signup", validateSignUp, home.signUpController);
router.post(
  "/login",
  passport.authenticate(`local`, {
    successRedirect: "/",
    failureRedirect: "/login_signup",
  })
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/membership", home.updateMembership);

module.exports = router;
