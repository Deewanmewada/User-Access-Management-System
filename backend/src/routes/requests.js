const express = require("express");
const { DataSource } = require("typeorm");
const { verifyToken, roleCheck } = require("../middleware/auth");

const router = express.Router();
const AppDataSource = new DataSource(require("../../ormconfig"));

let requestRepository;
let userRepository;
let softwareRepository;

AppDataSource.initialize()
  .then(() => {
    requestRepository = AppDataSource.getRepository("Request");
    userRepository = AppDataSource.getRepository("User");
    softwareRepository = AppDataSource.getRepository("Software");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// POST /api/requests - Employee only
router.post("/", verifyToken, roleCheck(["Employee"]), async (req, res) => {
  const { softwareId, accessType, reason } = req.body;
  if (!softwareId || !accessType || !reason)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await userRepository.findOneBy({ id: req.user.id });
    const software = await softwareRepository.findOneBy({ id: softwareId });
    if (!software) return res.status(404).json({ message: "Software not found" });

    const request = requestRepository.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending",
    });
    await requestRepository.save(request);
    res.status(201).json({ message: "Access request submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PATCH /api/requests/:id - Manager only (approve/reject)
router.patch("/:id", verifyToken, roleCheck(["Manager"]), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["Approved", "Rejected"].includes(status))
    return res.status(400).json({ message: "Invalid status" });

  try {
    const request = await requestRepository.findOneBy({ id: parseInt(id) });
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await requestRepository.save(request);
    res.json({ message: `Request ${status.toLowerCase()}` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/requests - Manager only
router.get("/", verifyToken, roleCheck(["Manager"]), async (req, res) => {
  try {
    const requests = await requestRepository.find({
      relations: ["user", "software"],
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
