const express = require("express");
const { addDoctor, getDoctor, getMyProfile, updateProfile } = require("../controllers/doctorController");
const auth = require("../middileware/authMiddleware");
const role = require("../middileware/roleMiddileware");

const router = express.Router();

router.post("/", auth, role("admin"), addDoctor);
router.get("/", auth, getDoctor);

router.get("/profile/me", auth, role("doctor"), getMyProfile);
router.put("/profile/me", auth, role("doctor"), updateProfile); 

module.exports = router;
