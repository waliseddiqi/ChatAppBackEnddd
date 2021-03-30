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
    userid:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
   
    age:{
        type:String,
        required:true,
        trim:true
    },
    
   
    photourl:{
        type:String,
        required:false
    },
    onlineStatus:{
        type:Boolean,
        required:true,
    },
    notificationId:{
        type:String,
        required:false,
        trim:true
    }
   
    },{
        timestamps:true,
    }
);

const User=mongoose.model('User',userSchema);

module.exports=User;