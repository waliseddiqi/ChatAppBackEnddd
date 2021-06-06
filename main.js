//https://chatappnewproject.herokuapp.com/

main=(app,express)=>{
    const cors = require("cors");
    
    const mongoose=require("mongoose");
    require('dotenv').config();
    
    app.use(cors());
    
    app.use(express.json({limit:'50mb'}));
    
    app.use(express.static('public'))
    const localuri=process.env.LOCAL_URI;
    
    const uri=process.env.ATLAS_URI;
    
    
      //  console.log(uri);
    mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
    const connection=mongoose.connection;
    connection.once('open',()=>{
        console.log("connected to mongodb")
    
    
    })
    
    
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
    
    console.log("here")
    }
    
    
    module.exports.main=main;