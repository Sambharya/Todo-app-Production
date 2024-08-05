const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');    // for password protection

//SIGNUP
router.post("/signup",async(req,res) =>{
    try {
        const {email,username,password} = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email,username,password:hashpassword});
        await user.save().then(() => res.status(200).json({message:"Sign Up Successfully!"}));
    } catch (error) {
        return res.status(200).json({
            message:"User Already Exists!",
        });
    }
});


//LOG IN
router.post("/signin",async(req,res) =>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(200).json({message:"Please Register First!"});
            return;
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordCorrect){
            res.status(200).json({message:"Incorrect Password"});
            return;
        }
        const {password,...others} = user._doc;
        res.status(200).json({others});
    } catch (error) {
        return res.status(200).json({
            message:"User Already Exists!",
        });
    }
});


module.exports = router;