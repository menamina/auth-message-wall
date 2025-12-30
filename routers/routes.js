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

module.exports = router;
