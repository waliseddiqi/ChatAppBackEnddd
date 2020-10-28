const router=require("express").Router();

const User=require("../models/user_model")

router.route("/getUsers").get((req,res)=>{
User.find()
.then(users=>res.json(users))
.catch(err=>res.status(400).json("Error:"+err));
});

router.route("/disconnect").post((req,res)=>{
console.log("Heee");
const username=req.body.username;
const id=req.body.id;
console.log(username+id);
User.deleteOne({username:username,id:id}).then((data)=>res.status(200).json(data))
.catch((err)=>res.status(400).send(err))


});

/*router.route("/check").post((req,res)=>{

const username=req.body.username;

User.find( { username: username } )
.then((user)=>{
    if(user.length>0){
        res.status(409).json("Not Available")
    }
    else{
        res.status(200).send("Available")
    }
   
    
}
)
.catch((err)=>res.status(404).send(err))


});*/

module.exports=router;