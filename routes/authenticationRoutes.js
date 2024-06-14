const express = require("express");
const {
  createUser,
  authenticateUser,
} = require("../controllers/userAuthController");
const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", authenticateUser);

module.exports = router;
