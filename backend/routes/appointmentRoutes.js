const express = require("express");
const { bookAppointment, getMyAppointments, getDoctorAppointments, getAllAppointments, updateStatus, cancelAppointment } = require("../controllers/appointmentController");
const auth = require("../middileware/authMiddleware");
const role = require("../middileware/roleMiddileware");

const router = express.Router();


router.post("/", auth, role("patient"),bookAppointment);
router.get("/myappo", auth, role("patient"),getMyAppointments);
router.get("/doctor", auth, role("doctor"),getDoctorAppointments);
router.get("/admin", auth, role("admin"),getAllAppointments);
router.patch( "/:id/status", auth, role("doctor"),updateStatus);
router.delete( "/:id/delete", auth, role("patient"),cancelAppointment);






module.exports = router;


