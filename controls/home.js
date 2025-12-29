const db = require("../storage/queries");

async function homePageView(req, res) {
  const msgs = await db.getMsgs();
  res.render("home", {
    msgs,
  });
}

async function loginSignUp(req, res) {
  res.render("login_signup");
}

module.exports = {
  homePageView,
  loginSignUp,
};
