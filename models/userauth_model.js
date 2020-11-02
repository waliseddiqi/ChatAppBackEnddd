const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20,
    },
    email:{
        type:String,
        required:true,
        
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
   
    },{
        timestamps:true,
    }
);

const UserAuth=mongoose.model('UserAuth',userSchema);

module.exports=UserAuth;