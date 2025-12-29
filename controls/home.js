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

async function validateSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const userFound = await db.findUser(email, password);
  } catch (error) {
    res.send(`Error Msg: ${error.message}`);
  }
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
