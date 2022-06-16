
const mongoose=require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema({
   name:{
       type:String,
       required:true,
   },
   email:{
       type:String,
       required:true,
       unique:true,
   },
   password:{
       type:String,
        required:true,
   },
   isAdmin:{
       type:Boolean,
       required:true,
       default:false,
   },
   pic:{
       type:String,
       required: true,
       default: "https://img.icons8.com/ios/50/000000/user--v1.png",

   }
  
},
{
    timestamps: true,
}
);
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(7);
    this.password= await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password);
}
const User=mongoose.model("User",userSchema);
module.exports=User;