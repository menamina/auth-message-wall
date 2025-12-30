const db = require("./pool");

async function getMsgs() {
  try {
    const msgs = await db.query(
      "SELECT messages.title, messages.body, messages.color, messages.posted, users.username users.fName FROM messages LEFT JOIN users ON messages.user_id = users.id ORDER BY messages.posted DESC"
    );
    return msgs.rows;
  } catch (error) {
    throw error;
  }
}

async function findUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function findUserByID(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

module.exports = {
  getMsgs,
  findUserByUsername,
  findUserByID,
};
