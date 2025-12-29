const db = require("../storage/queries");

async function homePageView(req, res) {
  const msgs = await db.getMsgs();
  res.render("home", {
    msgs,
  });
}

module.exports = {
  homePageView,
};
