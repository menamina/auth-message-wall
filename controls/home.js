const db = require("../storage/queries");

async function homePageView(req, res) {
  try {
    const msgs = await db.getMsgs;
    res.render("home", {
      msgs,
    });
  } catch (error) {
    res.send(`Error Msg: ${error.message}`);
  }
}

async function loginSignUp(req, res) {
  res.render("login_signup");
}

async function signUpController(req, res) {}

module.exports = {
  homePageView,
  loginSignUp,
  signUpController,
};
