const User=require("./models/user_model")

createUser=(username,userid,age,onlineStatus)=>{
const newUser=new User({username,userid,id,age,onlineStatus});

return newUser.save()


}


module.exports=createUser