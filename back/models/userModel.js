const { query } = require("../utils");
const bcrypt = require("bcryptjs");

async function createUser(email, password, name, lastname) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const sql =
    "INSERT INTO user ( email, password , name, lastname, date) VALUE(?, ?, ? , ?,NOW())";
  const values = [email, hash, name, lastname];

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

async function confirmUser(id) {
  const sql = "UPDATE user SET confirmed = '1' WHERE id = ?";
  const values = [id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
}

async function findUserById(id) {
  const sql = "SELECT * FROM user WHERE id = ?";
  const values = [id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error get user:", error);
    throw error;
  }
}

async function updateUserById(
  id,
  name,
  lastname,
  address,
  phone,
  zip,
  city,
  country,
  cgv
) {
  const sql =
    "UPDATE user SET name=? , lastname=? , address=? , phone=? , zip=? , city=? , country=? , cgv=? WHERE id = ?";
  const values = [name, lastname, address, phone, zip, city, country, cgv, id];
  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error get user:", error);
    throw error;
  }
}

async function generateToken(email, reset_password_token) {
  const sql = "UPDATE user SET reset_password_token=? WHERE email =?";
  const values = [reset_password_token, email];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error get user:", error);
    throw error;
  }
}
async function updateImg(image, id) {
  const sql = "UPDATE user SET image=? WHERE id =?";
  const values = [image, id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error get user:", error);
    throw error;
  }
}
async function checkToken(reset_password_token) {
  const sql = "SELECT * FROM user WHERE reset_password_token = ?";
  const values = [reset_password_token];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error update user:", error);
    throw error;
  }
}
async function updatePassword(reset_password_token, password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const sql =
    "UPDATE user SET password = ?, reset_password_token=NULL WHERE reset_password_token = ?";
  const values = [reset_password_token, hash];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error get user:", error);
    throw error;
  }
}
module.exports = {
  createUser,
  findUser,
  confirmUser,
  findUserById,
  updateUserById,
  generateToken,
  checkToken,
  updatePassword,
  updateImg,
};
