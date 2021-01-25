const router=require("express").Router();
const bycrpt=require("bcrypt");
const e = require("express");
const UserAuth=require("../models/userauth_model");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
fs = require('fs');
var privateKey="534c246b560d8a64242af148b14d5f1d8b06b";


router.route("/signin").post((req,res)=>{
let email=req.body.email;
let password=req.body.password;
UserAuth.find({email}).then(respond=>{
   ///sends token to user so user can login next time without writing password and email 
   //with checkauth route
    bycrpt.compare(password,respond[0].password).then((result)=>{
   
            if(result){
        
               //console.log(respond[0].userid);
                User.find({userid:respond[0].userid}).then(searchres=>{
                    console.log(searchres);
                    res.status(200).json({"result":"true","token":respond[0].token,searchres})
                })
               
            }else{
                res.status(401).json({"result":"false"})
            }
            
        
       
    })
}).catch(err=>{
    res.status(404).send(err);
})



})

router.route("/checkauth").post((req,res)=>{
    ///sends back users info to user and verifies user
let token=req.body.token;


jwt.verify(token,privateKey,(err,decoded)=>{
if(!err){
    res.status(200).send(decoded)
}
else{
    res.status(401).send(err)
}

})
})
//for getting user's general infos
function getUsersGeneralInfo(userid){

}

router.route("/signup").post((req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let username=req.body.username;
    let userid=req.body.userid;
    var token=jwt.sign({username:username,email:email},privateKey);
    
    bycrpt.hash(password,10,(err,h)=>{
        if(!err){
        let password=h;
          const newuser=new UserAuth({username,email,password,token,userid})
          newuser.save().then((resp)=>{
            res.status(200).send(resp)
          }).catch((err)=>{
              res.status(400).send(err)
          })
        }
   })
 
   
  
    
})

module.exports=router;