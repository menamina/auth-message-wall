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

async function loginSignUp(req, res) {
  res.render("login_signup");
}

async function userLoggedIn(req, res) {
  try {
    const { email, password } = req.body;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  homePageView,
  loginSignUp,
  userLoggedIn,
};
