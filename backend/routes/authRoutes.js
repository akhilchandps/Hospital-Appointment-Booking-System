const express = require("express");
const { register, login, authCheck, logout } = require("../controllers/authController");
const authMiddleware = require("../middileware/authMiddleware");

const router = express.Router();


router.post("/register",register)
router.post("/login",login)
router.get("/authCheck", authMiddleware, authCheck);
router.post("/logout", logout);



module.exports = router

