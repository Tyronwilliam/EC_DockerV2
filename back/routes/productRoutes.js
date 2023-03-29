const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  findProductByCategory,
  findProductById,
  findAllProductByRank,
} = require("../controller/productController");

router.get("/product", getAllProduct);
router.get("/product/category/:category_id", findProductByCategory);
router.get("/product/:id", findProductById);
router.get("/product/spotlight/rank", findAllProductByRank);

module.exports = router;
