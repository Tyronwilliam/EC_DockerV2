const { query } = require("../utils");

async function getProduct() {
  const sql = "SELECT * FROM product ORDER BY date DESC";
  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function getProductByCat(category_id) {
  const sql = "SELECT * FROM product WHERE category_id = ?";
  const values = [category_id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function getProductById(id) {
  const sql = "SELECT * FROM product WHERE id = ?";
  const values = [id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function getProductByRank() {
  const sql =
    "SELECT * FROM product WHERE product.id IN (SELECT avis.product_id FROM avis WHERE avis.rank > 4)";

  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.error("Error get Product by Rank:", error);
    throw error;
  }
}


module.exports = {
  getProduct,
  getProductByCat,
  getProductById,
  getProductByRank,
};
