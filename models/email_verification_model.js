const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const emailVerificationSchema=new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30,
    },
    code:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt: { type: Date, expires: 120 }
    },{
    
        timestamps:true,
        
    }
    

);


const EmailVerificationSchema=mongoose.model('EmailVerification',emailVerificationSchema);

module.exports=EmailVerificationSchema;