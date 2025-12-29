const db = require("./pool");

async function getMsgs() {
  const msgs = await db.query("SELECT * FROM messages");
  return msgs.rows;
}
