const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  findProductByCategory,
  findProductById,
  findAllProductByRank,
  addAProduct,
  deleteSingleProduct,
  UpdateAProduct,
} = require("../controller/productController");

router.get("/product", getAllProduct);
router.get("/product/category/:category_id", findProductByCategory);
router.get("/product/:id", findProductById);
router.get("/product/spotlight/rank", findAllProductByRank);

// ADMIN REQUIRE AUTH
router.post("/product/add", addAProduct);
router.delete("/product/delete/:id", deleteSingleProduct);
router.put("/product/update/:id", UpdateAProduct);

module.exports = router;
