const express=require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const CreateUser = require("./saveuser")
const DeleteUser = require("./deleteuser")
const connecttoDb = require("./main");

const port=process.env.PORT||5000;
connecttoDb.main(app,express);
const notification = require("./routers/notification_sender");
function getindex(userid, users) {
  return users.findIndex(x => x.userid == userid);
}



///send notification
//
var users = [];

io.on('connection', client => {


  console.log(client.id);
  //When a user gets connected
  client.on("web",(data)=>{
   console.log(data);
    console.log("web is here");
  })
  client.broadcast.emit("here","HEyyyy");
  client.on('connected', (data) => {
    // generateid(data.userid);
    console.log(client.id);
    console.log(data.userid);
    //old method
    index = getindex(data.userid, users);
    if (index == -1) {
      //if user does not exits add user into list
      users.push({ userid: data.userid, id: client.id });
    } else {
      //if users exits first remove user and then update (push it)
      users.splice(index, 1);
      users.push({ userid: data.userid, id: client.id });

    }
    console.log(users);
    // */

  })
  //when disconnected
  client.on("disconnected", (data) => {
    console.log("user discounted" + data.userid);
    var index = getindex(data.userid, users);
    users.splice(index, 1);
    console.log(users);
  })

  client.on("message", (data) => {

    client.broadcast.emit("receiveMessage", JSON.stringify({
      sender: data.sender,
      body: data.message
    }));
  });
  client.on("msg", (data) => {

 // console.log(data);

    var onlineuserid = users.find((user) => {

      return user.userid == data.touserid;
    }); 

    if (onlineuserid) {
      console.log("user is online");
      //user is online send message!
      io.to(onlineuserid.id).emit('pmsg', JSON.stringify({
        data
      }));
      //user is offline send notification
    } 
    else {
      console.log("user is offline");
      if(!data.isPhoto){
      
      
     // console.log(data);
      notification.SendNotification(data.notificationId,data.username,data.msg);
    }
  else{
    notification.SendNotification(data.notificationId,data.username,"Send a aphoto");
  }
  }


  })


});

server.listen(port);

console.log("listening to port "+ port);
///should be fixed
