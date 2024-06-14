const express = require("express");
const {
  getUserProgress,
  updateUserProgress,
} = require("../controllers/userTrackingController");
const {
  authenticateUser,
  authorizeRole,
} = require("../middleware/authorizationMiddleware");
const router = express.Router();

router.get("/users/:id/progress", authenticateUser, getUserProgress);
router.post("/users/:id/progress", authenticateUser, updateUserProgress);

module.exports = router;
