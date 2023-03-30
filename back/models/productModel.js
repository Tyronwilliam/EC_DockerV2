const { query } = require("../utils");

async function getProduct() {
  const sql = "SELECT * FROM product ORDER BY date DESC";
  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.error("Error Get Product:", error);
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
    console.error("Error  Get Product By Category:", error);
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
    console.error("Error Get Product By Id:", error);
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
    console.error("Error Get Product by Rank:", error);
    throw error;
  }
}
async function addProduct(
  name,
  category_id,
  price,
  img,
  description,
  quantity
) {
  const sql =
    "INSERT INTO product (name , category_id, price,img, description , quantity, date) VALUES (?, ?, ?, ?, ? ,?, NOW())";
  const values = [name, category_id, price, img, description, quantity];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error Add Product:", error);
    throw error;
  }
}
async function updateProduct(
  name,
  category_id,
  price,
  img,
  description,
  quantity,
  id
) {
  const sql =
    "UPDATE product SET name = COALESCE(?, name),category_id=COALESCE(?, category_id),price=COALESCE(?, price), img=COALESCE(?, img), description=COALESCE(?, description), quantity=COALESCE(?, quantity) WHERE id=?";

  const values = [name, category_id, price, img, description, quantity, id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error Update Product:", error);
    throw error;
  }
}

async function deleteProduct(id) {
  const sql = "DELETE FROM `product` WHERE id=?";

  const values = [id];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error("Error Delete Product:", error);
    throw error;
  }
}

module.exports = {
  getProduct,
  getProductByCat,
  getProductById,
  getProductByRank,
  addProduct,
  deleteProduct,
  updateProduct,
};
