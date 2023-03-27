const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  confirmAccount,
  testRequireAuth,
} = require("../controller/userController");
const requireAuth = require("../middleware/requireAuth");
router.post("/register", registerUser);
router.post("/login", login);
router.post("/confirmation-link/:email", confirmAccount);
router.get("/confirmation-link/:email", confirmAccount);
router.get("/findUser", requireAuth, testRequireAuth);

module.exports = router;
