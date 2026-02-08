const mongoose= require("mongoose");
require("dotenv").config()

const connectionString = process.env.COONECTION_STRING


mongoose.connect(connectionString).then(()=>{
    console.log("mongoDB connection successsfull");
    
}).catch((err)=>{
    console.log("mongoDB Connection error",err);
    
})