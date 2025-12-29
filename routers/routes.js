const { Router } = require("express");
const router = Router();
const home = require("../controls/home");

router.get("/", home.homePageView);
router.get("/login-signup", home.loginSignUp);
router.post("/login-signup", home.userLoggedIn);

module.exports = router;
