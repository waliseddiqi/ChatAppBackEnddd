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
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    token:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    userid:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
   
    },{
        timestamps:true,
    }
);

const UserAuth=mongoose.model('UserAuth',userSchema);

module.exports=UserAuth;