const server = require('http').createServer();
const io = require('socket.io')(server);
const CreateUser=require("./saveuser")
const DeleteUser=require("./deleteuser")
const connecttoDb=require("./main")
connecttoDb.main();

function getindex(userid,users){
  return users.findIndex(x=>x.userid==userid);
}

var users=[];

io.on('connection', client => {
  

//console.log(client.id);
//When a user gets connected
 
  client.on('connected',(data)=>{
   // generateid(data.userid);
    console.log(client.id);
    console.log(data.userid);
    //old method
    index=getindex(data.userid,users);
    if(index==-1){
      //if user does not exits add user into list
      users.push({userid:data.userid,id:client.id});
    }else{
      //if users exits first remove user and then update (push it)
      users.splice(index,1);
      users.push({userid:data.userid,id:client.id});

    }
    console.log(users);
   // */
  
  })
  //when disconnected
  client.on("disconnected",(data)=>{
    console.log("user discounted"+data.userid);
    var index=getindex(data.userid,users);
    users.splice(index,1);
    console.log(users);
  })


  client.on("message",(data)=>{
 
    client.broadcast.emit("receiveMessage",JSON.stringify({
      sender:data.sender,
      body:data.message
    }));
  });
  client.on("msg",(data)=>{
   console.log(client.id);
 /// console.log(data);
    console.log("messagesend");
    users.find((user,index)=>{
      if(user.userid==data.touserid){
        //user is online send message!
        io.to(user.id).emit('pmsg', JSON.stringify({
         data
        }));
      }
    });
  })

});
server.listen(3000);