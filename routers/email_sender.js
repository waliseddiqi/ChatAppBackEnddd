const router=require("express").Router();
const emailverificationmodel=require('../models/email_verification_model');
const UserAuth=require("../models/userauth_model");
router.route("/").post((req,res)=>{

let email=req.body.email;
console.log(email);
const mailsenderModel=require("../emailsend")
UserAuth.find({email}).then(respond=>{
 ///check if user is already signedup
    if(respond.length==0){
            mailsenderModel(email).then((resp)=>{
            let code=resp.code+"";
            console.log(code)
            const emailsavedata=new emailverificationmodel({email,code})
            emailsavedata.save().then((res)=>{
            ////
            })
            
            }).catch(()=>{
                res.status(400).send("Send successfully")
            })

            res.status(200).send("Send successfully")
    }else{
        res.status(409).send("Already exits")
    }

}).catch(err=>{
    console.log(err);
    res.status(404).send(err);
})



});

module.exports=router;