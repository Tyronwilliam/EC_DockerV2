const express = require("express");
const router = express.Router();
const {
  createSingleAvis,
  getAvisByProductId,
  getAvisByProductUserId,
  updateSingleAvis,
  deleteSingleAvis,
} = require("../controller/avisController");
const requireAuth = require("../middleware/requireAuth");

router.post("/avis/create", createSingleAvis);
router.get("/avis/user/:user_id", getAvisByProductUserId);
router.post("/avis/update/:id", updateSingleAvis);
router.delete("/avis/delete/:id", deleteSingleAvis);
// NON PROTECTED
router.get("/avis/product/:product_id", getAvisByProductId);

module.exports = router;
