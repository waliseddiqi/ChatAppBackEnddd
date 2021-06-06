const router=require("express").Router();
const emailVerificationModel=require("../models/email_verification_model");

router.route("/").post((req,res)=>{
let email=req.body.email;
let code=req.body.code;
console.log(code);
console.log(email);
emailVerificationModel.find({email:email,code:code}).then(result=>{
    //console.log(res.length);
    console.log(result);
if(result.length==0){
    res.status(401).send("Wrong code")
}
else{
 res.status(200).send("Accepted")
}
}).catch((err)=>{
    res.status(400).send("Error"+err);
})


});

module.exports=router;