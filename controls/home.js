const db = require("../storage/queries");
const { generatePassword } = require("../middleware/passwordUtil");

async function homePageView(req, res) {
  try {
    const msgs = await db.getMsgs;
    const user = await db.findUserByEmail(req.user.email);
    res.render("/home", {
      msgs,
      user,
    });
  } catch (error) {
    res.send(`Error Msg: ${error.message}`);
  }
}

async function loginSignUp(req, res) {
  res.render("/login_signup");
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
    res.redirect("/login_signup");
  } catch (error) {
    throw error;
  }
}

async function updateMembership() {
  try {
    await db.updateMembership(req.user.id);
    res.redirect("/home");
  } catch (err) {
    res.render("/memebrship", {
      error: err.message,
    });
  }
}

module.exports = {
  homePageView,
  loginSignUp,
  signUpController,
  updateMembership,
};
