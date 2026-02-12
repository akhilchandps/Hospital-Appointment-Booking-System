const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    qualification: {
      type: String,
    },
    experience: {
      type: Number,
    },
    consultationFee: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    availability: {
      // Available days of the week
      days: {
        type: [String],
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      // Available time slots
      timeSlots: {
        type: [String],
        default: [
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
        ],
      },
    },


    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  { timestamps: true }
);


const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor