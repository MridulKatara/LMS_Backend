const { Tracking } = require("../models");

const fetchUserTracking = async (req, res) => {
  try {
    const userTracking = await Tracking.findOne({
      where: { accountId: req.params.id, curriculumId: req.query.curriculumId },
    });
    if (!userTracking) {
      console.warn("User tracking not found for account ID:", req.params.id);
      return res.status(404).json({ error: "User tracking not found" });
    }
    res.json(userTracking);
  } catch (error) {
    console.error("Error fetching user tracking:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateTracking = async (req, res) => {
  try {
    let userTracking = await Tracking.findOne({
      where: { accountId: req.params.id, curriculumId: req.body.curriculumId },
    });
    if (!userTracking) {
      userTracking = await Tracking.create({
        ...req.body,
        accountId: req.params.id,
      });
    } else {
      await userTracking.update(req.body);
    }
    res.json(userTracking);
  } catch (error) {
    console.error("Error updating user tracking:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchUserTracking, updateTracking };
