const express = require("express");
const {
  getAllCourses,
  getCourseDetails,
  createNewCourse,
  updateExistingCourse,
  removeCourse,
} = require("../controllers/courseManagementController");
const {
  authenticateUser,
  authorizeRole,
} = require("../middleware/authorizationMiddleware");
const router = express.Router();

router.get("/", authenticateUser, getAllCourses);
router.get("/:id", authenticateUser, getCourseDetails);
router.post("/", authenticateUser, authorizeRole("teacher"), createNewCourse);
router.put(
  "/:id",
  authenticateUser,
  authorizeRole("teacher"),
  updateExistingCourse
);
router.delete("/:id", authenticateUser, authorizeRole("teacher"), removeCourse);

module.exports = router;
