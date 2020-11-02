const router=require("express").Router();
const bycrpt=require("bcrypt");
const e = require("express");
const UserAuth=require("../models/userauth_model");


 


router.route("/signin").post((req,res)=>{
let email=req.body.email;
let password=req.body.password;
UserAuth.find({email}).then(result=>{
    //console.log(result[0].password);
    bycrpt.compare(password,result[0].password).then((result)=>{
   
            if(result){
               // console.log(result);
                res.status(200).send(result)
            }else{
                res.status(401).send(false)
            }
            
        
       
    })
}).catch(err=>{
    res.status(404).send(err);
})



})


router.route("/signup").post((req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let username=req.body.username;
   

    bycrpt.hash(password,10,(err,h)=>{
        if(!err){
        let password=h;
          const newuser=new UserAuth({username,email,password})
          newuser.save().then((resp)=>{
            res.status(200).send(resp)
          }).catch((err)=>{
              res.status(400).send(err)
          })
        }
   })
 
   
  
    
})

module.exports=router;