const {
  getProduct,
  getProductByCat,
  getProductById,
  getProductByRank,
} = require("../models/productModel");

const getAllProduct = async (req, res) => {
  try {
    const result = await getProduct();
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Not data found for product All" });
    }
    res.status(200).json({ message: "recovery success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const findProductByCategory = async (req, res) => {
  const { category_id } = await req.params;
  try {
    const result = await getProductByCat(category_id);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Not data found for product Categorie" });
    }
    res.status(200).json({ message: "recovery success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
const findProductById = async (req, res) => {
  const { id } = await req.params;
  try {
    const result = await getProductById(id);
    if (result.length === 0) {
      return res.status(404).json({ message: "Not data found for product ID" });
    }
    res.status(200).json({ message: "recovery success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const findAllProductByRank = async (req, res) => {
  try {
    const result = await getProductByRank();
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Not data found for Rank > 4", data: result });
    }
    res.status(200).json({ message: "recovery success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
module.exports = {
  getAllProduct,
  findProductByCategory,
  findProductById,
  findAllProductByRank,
};
