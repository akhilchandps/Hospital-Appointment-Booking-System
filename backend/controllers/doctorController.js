const Doctor = require("../models/Doctor");
const User = require("../models/User");
const bcrypt = require("bcryptjs")


exports.addDoctor = async (req, res) => {
  try {
    const { 
      name, 
      specialization, 
      email, 
      password,
    } = req.body;

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    await newUser.save();

    const doctor = new Doctor({
      name,
      specialization,
      userId: newUser._id
    });

    await doctor.save();

     res.status(201).json({
      message: "Doctor added successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        specialization: doctor.specialization,
        email: newUser.email,
      }
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Failed to add doctor",
      error: error.message 
    });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
