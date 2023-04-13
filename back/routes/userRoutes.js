const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  confirmAccount,
  updateUser,
  resetPassword,
  confirmResetPassword,
  getUserFromId,
  updateUserImg,
} = require("../controller/userController");
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
});
const upload = multer({ storage });

router.put("/update/mypicture/:id", upload.single("image"), updateUserImg);
router.put("/update-user/:id", requireAuth, updateUser);

// NON PROTECTED
router.post("/register", registerUser);
router.post("/login", login);
router.post("/confirmation-link/:id", confirmAccount);
router.get("/confirmation-link/:id", confirmAccount);
router.post("/reset-password", resetPassword);
router.post("/confirm/reset-password/:token", confirmResetPassword);
router.get("/user/:id", requireAuth, getUserFromId);

module.exports = router;
