const router=require("express").Router();
const emailverificationmodel=require('../models/email_verification_model');

router.route("/").post((req,res)=>{

let email=req.body.email;
const mailsenderModel=require("../emailsend")
mailsenderModel(email).then((resp)=>{
let code=resp.code+"";
const emailsavedata=new emailverificationmodel({email,code})
emailsavedata.save().then((res)=>{
////
})
   
}).catch(()=>{
    
})

res.status(200).send("Send successfully")


});

module.exports=router;