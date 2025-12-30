const { Router } = require("express");
const passport = require("passport");
const router = Router();
const home = require("../controls/home");
const validateSignUp = require("../middleware/validators");

router.get("/", home.homePageView);
router.get("/login-signup", home.loginSignUp);
router.post("/login", passport.authenticate(`local`), home.validateSignIn);
// router.post("/signup", validateSignUp, home.validateSignUp);

module.exports = router;
