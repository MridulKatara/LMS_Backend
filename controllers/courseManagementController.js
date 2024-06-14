const { Curriculum, Module, Account } = require("../models");

const fetchAllCurriculums = async (req, res) => {
  try {
    const curriculums = await Curriculum.findAll();
    res.json(curriculums);
  } catch (error) {
    console.error("Error fetching all curriculums:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const fetchCurriculum = async (req, res) => {
  try {
    const curriculum = await Curriculum.findByPk(req.params.id, {
      include: Module,
    });
    if (!curriculum) {
      console.warn("Curriculum not found with ID:", req.params.id);
      return res.status(404).json({ error: "Curriculum not found" });
    }
    res.json(curriculum);
  } catch (error) {
    console.error("Error fetching curriculum:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const createCurriculum = async (req, res) => {
  try {
    const newCurriculum = await Curriculum.create({
      ...req.body,
      instructorId: req.user.id,
    });
    res.status(201).json(newCurriculum);
  } catch (error) {
    console.error("Error creating curriculum:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const modifyCurriculum = async (req, res) => {
  try {
    const curriculum = await Curriculum.findByPk(req.params.id);
    if (!curriculum || curriculum.instructorId !== req.user.id) {
      console.warn(
        "Not authorized to update curriculum with ID:",
        req.params.id
      );
      return res.status(403).json({ error: "Not authorized" });
    }
    await curriculum.update(req.body);
    res.json(curriculum);
  } catch (error) {
    console.error("Error updating curriculum:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const removeCurriculum = async (req, res) => {
  try {
    const curriculum = await Curriculum.findByPk(req.params.id);
    if (!curriculum || curriculum.instructorId !== req.user.id) {
      console.warn(
        "Not authorized to delete curriculum with ID:",
        req.params.id
      );
      return res.status(403).json({ error: "Not authorized" });
    }
    await curriculum.destroy();
    res.json({ message: "Curriculum removed" });
  } catch (error) {
    console.error("Error deleting curriculum:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchAllCurriculums,
  fetchCurriculum,
  createCurriculum,
  modifyCurriculum,
  removeCurriculum,
};
