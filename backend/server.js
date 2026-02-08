const express = require('express');
const cors = require("cors")
require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const doctorRoutes= require("./routes/doctorRoute")
const appointmentRoutes = require("./routes/appointmentRoutes")
const db = require("./DB/connectionString")
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/auth",authRoutes)
app.use("/doctors",doctorRoutes);
app.use("/appointments",appointmentRoutes);




const PORT = 3000 


app.listen(PORT,()=>{
    console.log("Server listening on PORT",PORT);    
})