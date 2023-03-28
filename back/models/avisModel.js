const { query } = require("../utils");

async function createAvis(name, rank, description, user_id, product_id) {
  const sql =
    "INSERT INTO avis (name, `rank`, description, user_id, product_id , date) VALUES (?, ?, ?, ?, ? , NOW())";
  const values = [name, rank, description, user_id, product_id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function getAllAvisByProductId(product_id) {
  const sql =
    "SELECT a.*, u.name AS name, u.lastname, u.img AS img, a.date AS review_date, a.name AS title FROM avis AS a INNER JOIN user AS u ON a.user_id = u.id WHERE a.product_id = ? ORDER BY a.date DESC";
  const values = [product_id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function getAllAvisByProductUserId(user_id) {
  const sql = "SELECT * FROM avis WHERE user_id =?";
  const values = [user_id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function deleteAvis(id) {
  const sql = "DELETE FROM `avis` WHERE id=?";
  const values = [id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function updateAvis(id, name, rank, description) {
  const sql =
    "UPDATE avis SET name=?, `rank`=?, description=?, date=NOW() WHERE id=?";
  const values = [name, rank, description, id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error update avis:", error);
    throw error;
  }
}
module.exports = {
  createAvis,
  getAllAvisByProductId,
  getAllAvisByProductUserId,
  updateAvis,
  deleteAvis,
};
