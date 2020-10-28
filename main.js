const express=require('express')

const mongoose=require("mongoose");
require('dotenv').config();
const app=express();
const port=process.env.PORT||5000;

app.use(express.json());

const uri=process.env.ATLAS_URI;

main=()=>{
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("connected to mongodb")
})}



const userrouter=require("./routers/user");
const emailsender=require("./routers/email_sender")
const emailverification=require("./routers/email_verification")
app.use("/user",userrouter);
app.use("/sendEmail",emailsender);
app.use("/verifyEmail",emailverification);
app.listen(port,()=>{
    console.log("server created on port 5000 ");
})



module.exports.main=main;