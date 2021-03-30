const router=require("express").Router();
const io  = require("../app");
router.route("/testmsg").post((req,res)=>{

const data = req.body.data;
console.log(data);
testMessage(data);
res.send("hhhh");

})

var testMessage = (data)=>{
    
    io.io.to(data.touserid).emit('pmsg', JSON.stringify({
      data
    }));
  }

module.exports=router;