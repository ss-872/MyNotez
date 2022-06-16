const express=require("express")
const app=express();
const dotenv=require("dotenv")
dotenv.config()

const bodyParser = require('body-parser')
const userRoutes=require("./Routes/userRoutes");
const noteRoutes=require("./Routes/noteRoutes");
const connectDB=require("./config/db");
app.get('/',(req,res)=>{
    res.send("Api is running")
})
connectDB();
app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);
console.log("server")
const PORT=process.env.PORT|| 5000;
app.listen(PORT,console.log(`server started on port {PORT}`));