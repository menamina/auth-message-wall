const db = require("../storage/queries");
const { generatePassword } = require("../middleware/passwordUtil");

async function homePageView(req, res) {
  try {
    const msgs = await db.getMsgs();
    res.render("home", {
      msgs,
      user: req.user ? req.user : null,
    });
    console.log(req.user);
  } catch (error) {
    res.send(error.message);
  }
}

async function loginSignUp(req, res) {
  res.render("login_signup");
}

async function signUpController(req, res) {
  const { fName, username, email, password } = req.body;
  try {
    const { hash, salt } = generatePassword(password);
    await db.addUser({
      fName,
      username,
      email,
      hash: hash,
      salt: salt,
      isMember: false,
    });
    res.redirect("login-signup");
  } catch (error) {
    res.send(`${error.message}`);
  }
}

function getMembershipView(req, res) {
  res.render("memebership");
}

async function updateMembership(req, res) {
  try {
    await db.updateMembership(req.user.id);
    res.redirect("/home");
  } catch (error) {
    res.render("membership", {
      error: error.message,
    });
  }
}

function getNewMsgView(req, res) {
  const username = req.username;
  res.render("newMsg", { username });
}

async function addNewMsg(req, res) {}

module.exports = {
  homePageView,
  loginSignUp,
  signUpController,
  getMembershipView,
  updateMembership,
  getNewMsgView,
  addNewMsg,
};
