const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');

//CREATE
router.post("/addTask",async (req,res) => {
    try {
        const {title,body,id} = req.body;
        const existingUser = await User.findById(id);  //checking user is exist or not to add 
                                                           // task
        if(existingUser){
            const list = new List({title,body,user:existingUser});
            await list.save().then(() => res.status(200).json({list}));
            existingUser.list.push(list); // add new list to the existing user in a list array
            existingUser.save();
        }
    } catch (error) {
        console.log(error);
    }
});


//UPDATE
router.put("/updateTask/:id",async (req,res) => {
    try {
        const {title,body} = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, {title,body}); //params URL 
                                                                            //ki id fetch  krega
        list.save().then(() => res.status(200).json(
            {message:"Your Task Updated Successfully!"}));
    } catch (error) {
        console.log(error);
    }
});


//DELETE
router.delete("/deleteTask/:id",async (req,res) => {
    try {
        const {id} = req.body;
        const existingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).
            json(
                {message:" Task Deleted Successfully!"})
            );
        }
    } catch (error) {
        console.log(error);
    }
});


//getTasks
router.get("/getTasks/:id",async(req,res) => {
    const list = await List.find({user:req.params.id}).sort({createdAt:-1});
    if(list.length!==0){
        res.status(200).json({list:list});
    }
    else{
        res.status(200).json({message:"No Tasks Found"});
    }
});

module.exports = router;