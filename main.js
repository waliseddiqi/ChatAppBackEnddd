const express=require('express')
const cors = require("cors");
const mongoose=require("mongoose");
require('dotenv').config();
const app=express();
app.use(cors());
const port=process.env.PORT||5000;

app.use(express.json({limit:'50mb'}));

app.use(express.static('public'))
const uri=process.env.LOCAL_URI;


main=()=>{
mongoose.connect("mongodb://localhost:27017/Chatapp",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("connected to mongodb")
})}




const userrouter=require("./routers/user");
const emailsender=require("./routers/email_sender")
const emailverification=require("./routers/email_verification")
const userauth=require("./routers/userauth")
const testroutes = require("./routers/test")
app.use("/user",userrouter);
app.use("/sendEmail",emailsender);
app.use("/verifyEmail",emailverification);
app.use("/userauth",userauth);
app.use("/test",testroutes);

app.listen(port,()=>{
    console.log("server created on port 5000 ");
})



module.exports.main=main;