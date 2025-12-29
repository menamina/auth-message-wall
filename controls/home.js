const db = require("../storage/queries");

async function homePageView(req, res) {
  try {
    const msgs = await db.getMsgs;
    res.render("home", {
      msgs,
    });
  } catch (error) {
    res.send(`Error: ${error.message}`);
  }
}

async function validateSignIn() {}

async function loginSignUp(req, res) {
  res.render("login_signup");
}

async function validateSignUp(req, res) {
  const { fname, email, password, confirmPassword } = req.body;
}

module.exports = {
  homePageView,
  loginSignUp,
  validateSignIn,
  validateSignUp,
};
