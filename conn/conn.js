const mongoose = require('mongoose');

const conn = async(req,res) =>{
    try {
        await mongoose.connect("mongodb+srv://abhisheksambharya05:Yash%40572003@cluster0.glpmqpc.mongodb.net/").then(()=>{
            console.log("Connected");
        });
    } catch (error) {
        res.status(400).json({
            message:"Not Connected",
        });
    }
};
conn();