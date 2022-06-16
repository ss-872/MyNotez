const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const generateToken = require('../util/generateToken');
const registerUser=asyncHandler(async (req,res)=> {
    const {name,email,password,pic}=req.body
    console.log({name})
    console.log({email,password})
   
    const userExists=await User.findOne({email});
    if (userExists)
    {
        throw new Error("hello!!")
     
       
    }
    const user=await User.create({
        name,email,password,pic
    })
    if (user)
    {
        console.log("Success")
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token:generateToken(user._id)
            
        })
    }
    else{
        console.log("Error occurred");
    }
    res.json({
        name,email
    });
});
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if (user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }
    else{
        console.log("Invalid email or password");
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });
  
module.exports={registerUser,authUser,updateUserProfile};