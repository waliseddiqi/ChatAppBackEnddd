const server = require('http').createServer();
const io = require('socket.io')(server);
const CreateUser=require("./saveuser")
const DeleteUser=require("./deleteuser")
const connecttoDb=require("./main")
connecttoDb.main();
io.on('connection', client => {
 
  client.on('event', data => {
      console.log(data)
      io.emit("msg","Heyy");
      
});

  client.on('connected',()=>{
    
  })
 /* client.on('disconnect', (data) => { 
    console.log("disss");
    DeleteUser(data.username,data.id,true)
   });*/
  client.on("userSignup",(data)=>{
    console.log(data);
    CreateUser(data.name,client.id,true,data.gender,data.age)
  
    io.to(client.id).emit('ID', JSON.stringify({"id":client.id}));
   // users.push({id:client.id,name:data})
    //console.log(data)

   /* client.broadcast.emit("userconnected",JSON.stringify({
      id:client.id,
      name:data
    }));*/
  })

  client.on("SendPrivateMessage",(data)=>{
    console.log(data)
    io.to(data.id).emit('recievePrivateMessage', JSON.stringify({
      id:data.id,
      messege:data.messege
    }));
  })

  client.on("message",(data)=>{
 
    client.broadcast.emit("receiveMessage",JSON.stringify({
      sender:data.sender,
      body:data.message
    }));
  });

});
server.listen(3000);