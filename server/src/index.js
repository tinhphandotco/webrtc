const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const omit = require('ramda/src/omit');

io.on('connection', function(socket){
  console.log('a user connected: ', socket.id);

  socket.on('user:join-room', (roomName, fn) => {
    socket.join(roomName);
    socket.to(roomName).emit('peer:connected', {
      id: socket.id
    });
    fn(roomName);
    console.log('user:join-room: ', roomName);
  });

  socket.on('disconnecting', () => {
    const rooms = omit([socket.id], socket.rooms);
    Object.keys(rooms).forEach(room => {
      console.log('disconnecting: ', room)
    })
  })
});

http.listen(9999, function(){
  console.log('listening on *:9999');
});