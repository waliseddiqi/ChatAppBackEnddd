var http = require('http'),
    socketio = require('socket.io'),
    options={},
    port=5000;


//start http
var app = http.createServer(),
    io = socketio(app, {
        log: false,
        agent: false,
        origins: '*:*'
        // 'transports': ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']
    });

app.listen(port);
console.log('listening on port ' + port);

io.on('connection', (socket) => {

    console.log('a user connected');
    socket.on('chat', (data) => {
     console.log(data)
     console.log(socket.client.id)
    });
    ///create room and users join in there
    socket.on("connect",(user)=>{
        console.log(user);
        console.log("sdsdsd");
    })
      ///send message to specific room
    socket.on("sendmsg",(msg)=>{
        socket.broadcast.to('name').emit('message', 'nice game');
    })
  });
