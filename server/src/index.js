const omit = require('ramda/src/omit');

const fs = require('fs');
const server = require('https').createServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
});
const io = require('socket.io')(server);

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
  });

  socket.on('peer:msg', (data) => {
    console.log('peer:msg - ' + data.type + ' from ' + data.from + ' to ' + data.to);
    io.to(data.to).emit('peer:msg', data);
  });
});

server.listen(9999);