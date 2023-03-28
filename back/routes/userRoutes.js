const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  confirmAccount,
  updateUser,
  resetPassword,
  confirmResetPassword,
} = require("../controller/userController");
const requireAuth = require("../middleware/requireAuth");

router.put("/update-user/:id", requireAuth, updateUser);
// NON PROTECTED
router.post("/register", registerUser);
router.post("/login", login);
router.post("/confirmation-link/:email", confirmAccount);
router.get("/confirmation-link/:email", confirmAccount);
router.post("/reset-password", resetPassword);
router.post("/confirm/reset-password/:token", confirmResetPassword);

module.exports = router;
