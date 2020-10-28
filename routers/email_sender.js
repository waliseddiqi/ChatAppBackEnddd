const router=require("express").Router();
const emailverificationmodel=require('../models/email_verification_model');

router.route("/").post((req,res)=>{

let email=req.body.email;
const mailsenderModel=require("../emailsend")
mailsenderModel(email).then((res)=>{
let code=res.code+"";
const emailsavedata=new emailverificationmodel({email,code})
emailsavedata.save().then((res)=>{

console.log(res)
})
   
}).catch(()=>{
    
})

res.status(200).send("Send successfully")


});

module.exports=router;