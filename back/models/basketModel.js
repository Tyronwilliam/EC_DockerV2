const { query } = require("../utils");

async function addToBasket(user_id, product_id, quantity) {
  const sql =
    "INSERT INTO user_purchases (user_id, product_id, quantity) VALUES (?, ?, ?)";

  const values = [user_id, product_id, quantity];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error ADD to Basket:", error);
    throw error;
  }
}

async function updateQuantity(quantity, id) {
  const sql = "UPDATE product SET quantity = quantity - ? WHERE id = ?";

  const values = [quantity, id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error ADD to Basket:", error);
    throw error;
  }
}
async function getBasket(user_id) {
  const sql = "SELECT * FROM user_purchases WHERE user_id = ?";

  const values = [user_id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error GET to Basket:", error);
    throw error;
  }
}
async function deleteItemFromBasket(product_id, user_id) {
  const sql =
    "DELETE FROM user_purchases WHERE product_id = ? AND user_id = ? ";

  const values = [product_id, user_id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error  Delete Item Basket:", error);
    throw error;
  }
}
async function deleteAllBasket(product_id, user_id) {
  const sql = "DELETE FROM user_purchases WHERE user_id = ? ";

  const values = [product_id, user_id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error Delete All Basket:", error);
    throw error;
  }
}
module.exports = {
  addToBasket,
  deleteItemFromBasket,
  deleteAllBasket,
  getBasket,
  updateQuantity,
};
