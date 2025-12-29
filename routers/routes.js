const { Router } = require("express");
const router = Router();
const home = require("../controls/home");
const validateSignUp = require("../middleware/validators");

router.get("/", home.homePageView);
router.get("/login-signup", home.loginSignUp);
router.post("/login-signup", validateSignUp, home.postSignInSignUp);

module.exports = router;
