const Doctor = require("../models/Doctor");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.addDoctor = async (req, res) => {
  try {
    const { 
      name, 
      specialization, 
      email, 
      password,
      phone,
      qualification,
      experience,
      consultationFee,
      availability,
      address,
      city
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    await newUser.save();

    // Create Doctor with availability
    const doctor = new Doctor({
      name,
      specialization,
      userId: newUser._id,
      email,
      phone,
      qualification,
      experience,
      consultationFee,
      availability: availability || {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timeSlots: [
          "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
          "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
        ]
      },
      address,
      city,
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor added successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        specialization: doctor.specialization,
        email: doctor.email,
        availability: doctor.availability,
      }
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Failed to add doctor",
      error: error.message 
    });
  }
};

// YOUR ORIGINAL FUNCTION - getDoctor
exports.getDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW FUNCTION - Get logged-in doctor's profile
exports.getMyProfile = async (req, res) => {
  try {
    // req.user comes from your auth middleware
    const userId = req.user.id;

    // Find doctor by userId
    const doctor = await Doctor.findOne({ userId }).populate("userId", "name email role");

    if (!doctor) {
      return res.status(404).json({ 
        message: "Doctor profile not found" 
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch profile",
      error: error.message 
    });
  }
};

// NEW FUNCTION - Update doctor profile (including availability)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const {
      name,
      specialization,
      availability
    } = req.body;

    // Find and update doctor
    const doctor = await Doctor.findOneAndUpdate(
      { userId },
      {
        name,
        specialization,
        availability
      },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ 
        message: "Doctor not found" 
      });
    }

    // Also update name in User model if provided
    if (name) {
      await User.findByIdAndUpdate(userId, { name });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Failed to update profile",
      error: error.message 
    });
  }
};