const router=require("express").Router();
const io  = require("../app");
const file = require("fs");


function base64_encode(data) {
  // read binary data
  var bitmap = file.readFileSync(data);
  // convert binary data to base64 encoded string
  return new Buffer.from(bitmap).toString('base64');
}

router.route("/testmsg").get((req,res)=>{


/*file.writeFile("./respond.txt",data,(value)=>{
  console.log(value);
})
*/
var imagebase = "";

imagebase =  base64_encode("D:/Side_Projects/ChatApp/BackEnd/ChatAppBackEnd/routers/ss.png");
res.send(imagebase);


})


module.exports=router;