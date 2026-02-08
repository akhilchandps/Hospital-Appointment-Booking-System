const express = require("express");
const { addDoctor, getDoctor } = require("../controllers/doctorController");
const auth = require("../middileware/authMiddleware");
const role = require("../middileware/roleMiddileware");

const router = express.Router();

router.post("/", auth, role("admin"), addDoctor);
router.get("/", auth, getDoctor);

module.exports = router;
