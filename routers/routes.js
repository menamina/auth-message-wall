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
    failureRedirect: "/login-signup",
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

router.get("/membership", home.getMembershipView);
router.post("/membership", home.updateMembership);

router.get("/new-message", home.getNewMsgView);
router.post("/new-message", home.addNewMsg);

module.exports = router;
