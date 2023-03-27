const { query } = require("../utils");
const bcrypt = require("bcryptjs");

async function createUser(email, password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const sql = "INSERT INTO user ( email, password, date) VALUE(?, ?, NOW())";
  const values = [email, hash];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function findUser(email) {
  const sql = "SELECT * FROM user WHERE email = ?";
  const values = [email];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error get user:", error);
    throw error;
  }
}

async function confirmUser(email) {
  const sql = "UPDATE user SET confirmed = '1' WHERE email = ?";
  const values = [email];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
}

async function findUserById(id) {
  const sql = "SELECT id FROM user WHERE id = ?";
  const values = [id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error get user:", error);
    throw error;
  }
}
module.exports = { createUser, findUser, confirmUser, findUserById };
