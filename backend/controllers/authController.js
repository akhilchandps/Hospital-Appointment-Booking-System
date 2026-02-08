const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")

exports.register = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "email Alraedy exist" })
        }

        const hashed = await bcrypt.hash(password, 10);


        const newUser = new User({
            name,
            email,
            password: hashed,
            role,
        })

        newUser.save();
        res.status(201).json(newUser)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({ message: "login successfull", role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.json({ message: "Logged out" });
};

exports.authCheck = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

