const jwt=require("jsonwebtoken")
const User=require("../models/usersModel")
const asyncHandler = require('express-async-handler');
const protect=asyncHandler(async(req,res,next)=>{
    let token
    if (req.headers.authorization &&  req.headers.authorization.startsWith("Bearer")){
        try{
            
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            
            next();
            return 
        }
        catch (error){
            console.log(error)
            throw new Error("Not authorized, token failed");
            return;
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
        return ;
    }
})
module.exports = {protect};