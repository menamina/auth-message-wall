const db = require("../storage/queries");
const { generatePassword } = require("../middleware/passwordUtil");

async function homePageView(req, res) {
  try {
    const msgs = await db.getMsgs();
    msgs.forEach((msg) => {
      const slashDate = msg.posted.toLocaleDateString();
      const dotDate = slashDate.replaceAll("/", ".");
      msg.postedDate = dotDate;
    });
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
  res.render("membership", {
    error: null,
  });
}

async function updateMembership(req, res) {
  try {
    await db.updateMembership(req.user.id);
    res.redirect("/");
  } catch (error) {
    res.render("membership", {
      error: error.message,
    });
  }
}

function getNewMsgView(req, res) {
  res.render("newMsg");
}

async function addNewMsg(req, res) {
  const id = req.user.id;
  const { title, body } = req.body;
  try {
    await db.addNewMsg(id, title, body);
    res.redirect("/");
  } catch (error) {
    throw new Error(`controller err @ addNewMsg() w msg: ${error.message}`);
  }
}

async function deleteMsg(req, res) {}

module.exports = {
  homePageView,
  loginSignUp,
  signUpController,
  getMembershipView,
  updateMembership,
  getNewMsgView,
  addNewMsg,
  deleteMsg,
};
