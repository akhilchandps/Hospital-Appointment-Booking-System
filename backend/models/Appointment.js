const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({patientId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

doctorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Doctor",
  required: true,
},

  date: String,
  timeSlot: String,
  status: {
    type: String,
    required:true,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports=Appointment
