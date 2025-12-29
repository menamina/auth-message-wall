const db = require("../storage/pool");

async function homePageView(req, res) {
  const msgs = await db.getMsgs();
  res.render("home", {
    msgs,
  });
}
