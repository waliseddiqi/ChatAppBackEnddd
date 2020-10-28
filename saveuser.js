const User=require("./models/user_model")

createUser=(username,id,onlineStatus,gender,age)=>{
const newUser=new User({username,id,onlineStatus,gender,age});

return newUser.save()


}


module.exports=createUser