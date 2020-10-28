const User=require("./models/user_model")

deleteUser=(username,id,onlineStatus)=>{
const newUser=new User({username,id,onlineStatus});

return newUser.deleteOne({"id":id})


}


module.exports=deleteUser