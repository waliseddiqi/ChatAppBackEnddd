const router=require("express").Router();

const User=require("../models/user_model")

router.route("/getUsers").get((req,res)=>{
    
User.find()
.then(users=>res.json(users))
.catch(err=>res.status(400).json("Error:"+err));
});


router.route("/getUser").post((req,res)=>{
var userid = req.body.userid;
User.find({userid})
.then((user)=>{
    if(user.length!=0){
        res.status(200).json(user)
    }
    else{
        res.status(404).json("couldnt find user")
    }
})
.catch(err=>res.status(400).json("Error:"+err));
})

router.route("/disconnect").post((req,res)=>{
console.log("Heee");
const username=req.body.username;
const id=req.body.id;
console.log(username+id);
User.deleteOne({username:username,id:id}).then((data)=>res.status(200).json(data))
.catch((err)=>res.status(400).send(err))


});

router.route("/signupuser").post(async(req,res)=>{
    var image=req.body.image;
    var format=req.body.format;
    var fullUrl = req.protocol + '://' + req.get('host');
   
    const randomnumber=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    var username=req.body.username;
    var notificationId=req.body.notificationId;
    console.log(username);
    var userid=req.body.username+randomnumber;
    var age=req.body.age;
    var onlineStatus=true;
    var realFile = Buffer.from(image,"base64");
    
    writeFile(userid,format,realFile,fullUrl).then((url)=>{
        const newUser=new User({username:username,userid:userid,age:age,onlineStatus:onlineStatus,photourl:url,notificationId:notificationId});

        newUser.save().then((respond)=>{
            res.status(200).json(respond);
    
        }).catch((err)=>{
            console.log(err);
            res.status(400).send(err)
        });
    
    
    
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err)
    })
   


})


router.route("/signupuserWithOutImage").post(async(req,res)=>{
    
   
    const randomnumber=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    var username=req.body.username;
    var notificationId=req.body.notificationId;
    console.log(notificationId);
    var userid=req.body.username+randomnumber;
    var age=req.body.age;
    var onlineStatus=true;
    var imageurl="";
    
    const newUser=new User({username:username,userid:userid,age:age,onlineStatus:onlineStatus,photourl:imageurl,notificationId:notificationId});

    newUser.save().then((respond)=>{
        res.status(200).json(respond);

    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err)
    });





})

///signupuserWithOutImage
const writeFile = (userid,format,file,fullUrl) => {
    return new Promise((resolve,reject)=>{
        try {
           fs.writeFile("./public/images/"+userid+"."+format, file, function(err) {
               if(err){
                
                reject(err);
                return;
               }       
               resolve(fullUrl+"/images/"+userid+"."+format);
              
            });
           } catch (error) {
             console.log(error);
             res.status(500).json({"error":"Error uploading file"});
           }
    })
}
router.route("/updateProfilePhoto").post(async(req,res)=>{

    var image=req.body.image;
    var format=req.body.format;
    var userid=req.body.userid;
    var realFile = Buffer.from(image,"base64");
    try {
        await fs.writeFile("./public/images/"+userid+"."+format, realFile, function(err) {
           if(err){

            // console.log(err);
           }       
        });
       } catch (error) {
         console.log(error);
         res.status(500).json({"error":"Error uploading file"});
       }



})

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