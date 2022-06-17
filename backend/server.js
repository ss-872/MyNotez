const express=require("express")
const app=express();
const dotenv=require("dotenv")
dotenv.config()
const path=require("path")
const bodyParser = require('body-parser')
const userRoutes=require("./Routes/userRoutes");
const noteRoutes=require("./Routes/noteRoutes");
const connectDB=require("./config/db");

connectDB();
app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

//deplyoment
__dirname = path.resolve();


if(process.env.NODE_ENV === 'production'){
    console.log("hi")
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}else{
    app.get('/',(req,res)=>{
        res.send("Api is running..");
    })
}


console.log("server")
const PORT=process.env.PORT|| 5000;
app.listen(PORT,console.log(`server started on port ${PORT}`));