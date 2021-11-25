// Node server which will handle socket io connections
const io =require('socket.io')(8000,{
    cors:{
        origin:"*",
    }
});

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', chaitu =>{
   // console.log("New user", name);
      users[socket.id] = chaitu;
      socket.broadcast.emit('user-joined', chaitu);
    });

    socket.on('send', message =>{
       socket.broadcast.emit('receive', {message: message, chaitu: users[socket.id]})
    });
    
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
     });



})