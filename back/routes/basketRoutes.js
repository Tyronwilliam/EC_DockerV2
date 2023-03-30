const express = require("express");
const router = express.Router();
const {
  AddToBasket,
  DeleteItemFromBasket,
  DeleteAllBasket,
  GetBasket,
  UpdateQuantity,
} = require("../controller/basketController");
// USER REQUIRE AUTH
router.post("/basket/add", AddToBasket);
router.delete("/basket/delete", DeleteItemFromBasket);
router.delete("/basket/delete/all/:user_id", DeleteAllBasket);
router.get("/basket", GetBasket);
router.post("/basket/update", UpdateQuantity);

module.exports = router;
