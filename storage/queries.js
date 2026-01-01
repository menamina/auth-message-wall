const db = require("./pool");

async function getMsgs() {
  try {
    const msgs = await db.query(
      "SELECT messages.title, messages.body, messages.color, messages.posted, users.username, users.fName FROM messages LEFT JOIN users ON messages.user_id = users.id ORDER BY messages.posted DESC"
    );
    return msgs.rows;
  } catch (error) {
    throw new Error(`sql err in getMsgs() query w msg: ${error.message}`);
  }
}

async function addUser({ fName, username, email, hash, salt, isMember }) {
  try {
    await db.query(
      "INSERT INTO users (fName, username, email, hash, salt, isMember) VALUES ($1, $2, $3, $4, $5, $6)",
      [fName, username, email, hash, salt, isMember]
    );
  } catch (error) {
    throw new Error(`sql err in addUser() query w msg: ${error.message}`);
  }
}

async function findUserByEmail(email) {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    throw new Error(
      `sql err in findUSerByEmail() query w msg: ${error.message}`
    );
  }
}

async function findUserByID(id) {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
  } catch (error) {
    throw new Error(`sql err in findUserByID() query w msg: ${error.message}`);
  }
}

async function updateMembership(userID) {
  try {
    const { canUpdate } = await db.query(
      "UPDATE users SET isMember = true WHERE id = $1",
      [userID]
    );
    if (canUpdate.rowCount === 0) {
      throw new Error("cant find user");
    }
  } catch (error) {
    throw new Error(
      `sql err in updateMembership() query w msg: ${error.message}`
    );
  }
}

module.exports = {
  getMsgs,
  addUser,
  updateMembership,
  findUserByEmail,
  findUserByID,
};
