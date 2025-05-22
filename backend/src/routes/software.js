const express = require("express");
const { DataSource } = require("typeorm");
const { verifyToken, roleCheck } = require("../middleware/auth");

const router = express.Router();
const AppDataSource = new DataSource(require("../../ormconfig"));

let softwareRepository;

AppDataSource.initialize()
  .then(() => {
    softwareRepository = AppDataSource.getRepository("Software");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// POST /api/software - Admin only
router.post("/", verifyToken, roleCheck(["Admin"]), async (req, res) => {
  const { name, description, accessLevels } = req.body;
  if (!name || !description || !accessLevels)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const software = softwareRepository.create({
      name,
      description,
      accessLevels,
    });
    await softwareRepository.save(software);
    res.status(201).json({ message: "Software created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/software - all authenticated users
router.get("/", verifyToken, async (req, res) => {
  try {
    const softwareList = await softwareRepository.find();
    res.json(softwareList);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
