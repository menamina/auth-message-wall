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

async function addUser(fName, username, email, hash, salt, isMember) {
  try {
    await pool.query("INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)", [
      fName,
      username,
      email,
      hash,
      salt,
      isMember,
    ]);
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      [email],
    ]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function findUserByID(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function updateUser(username) {
  try {
    const { rows } = await pool.query(
      "UPDATE secret_society SET isMember = TRUE WHERE username = $1",
      [username]
    );
    if (rows.rowCount === 0) {
      throw new Error("cant find user");
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getMsgs,
  addUser,
  updateUser,
  findUserByEmail,
  findUserByID,
};
