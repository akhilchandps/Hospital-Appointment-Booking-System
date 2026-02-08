const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
Appointment

exports.bookAppointment = async (req, res) => {
    try {

        const { doctorId, date, timeSlot } = req.body;

        const exists = await Appointment.findOne({
            doctorId,
            date,
            timeSlot,
            status: { $ne: "cancelled" },
        });

        if (exists) {
            return res.status(400).json({
                message: "Slot already booked",
            });
        }

        const appointment = await Appointment.create({
            patientId: req.user.id,
            doctorId,
            date,
            timeSlot,
        });

        res.status(201).json(appointment);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};


exports.getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment
            .find({ patientId: req.user.id })
            .populate("doctorId");

        res.status(200).json(appointments);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch appointments",
            error: error.message,
        });
    }
};


exports.getDoctorAppointments = async (req, res) => {

    try {
        const doctor = await Doctor.findOne({ userId: req.user.id });

        const appts = await Appointment.find({
            doctorId: doctor._id,
        }).populate("patientId", "name email role");;

        res.status(200).json(appts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch Doctorappointments",
            error: error.message,
        });
    }

};

exports.getAllAppointments = async (req, res) => {
    try {
        const appts = await Appointment.find()
            .populate("doctorId")
            .populate("patientId");

        res.status(200).json(appts)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch getAllappointments",
            error: error.message,
        });
    }


};

exports.updateStatus = async (req, res) => {

    try {
        const { status } = req.body;
        const { id } = req.params

        const appt = await Appointment.findByIdAndUpdate(id);

        appt.status = status;

        await appt.save();

        res.status(200).json(appt);

    } catch (error) {
        res.status(500).json({
            message: "Failed to updateStatus",
            error: error.message,
        });
    }
};

exports.cancelAppointment = async (req, res) => {

    try {
        const appt = await Appointment.findById(req.params.id);

        if (appt.patientId.toString() !== req.user.id)
            return res.status(403).json({ msg: "Not allowed" });

        appt.status = "cancelled";
        await appt.save();

        res.json(appt);
    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel appointment",
            error: error.message,
        });
    }

};
