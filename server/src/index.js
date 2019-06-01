const omit = require('ramda/src/omit');
const path = require('ramda/src/path');

const fs = require('fs');
const server = require('https').createServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
});
const io = require('socket.io')(server);
const roomConfig = {};
const listMesssages = {};

io.on('connection', function(socket){
  console.log('a user connected: ', socket.id);

  socket.on('user:join-room', (roomName) => {
    socket.join(roomName);
    io.to(socket.id).emit('room:config', {
      listMesssages: listMesssages[roomName] || [],
      password: path([roomName, 'password'], roomConfig) || ''
    });
    io.to(socket.id).emit('chat:list-message', listMesssages[roomName] || []);
    socket.to(roomName).emit('peer:connected', {
      id: socket.id,
    });
    console.log('user:join-room: ', roomName);
  });

  socket.on('disconnecting', () => {
    const rooms = omit([socket.id], socket.rooms);
    Object.keys(rooms).forEach(room => {
      socket.to(room).emit('peer:disconnecting', {
        id: socket.id
      });
      console.log('disconnecting: ', room)
      if (Object.keys(io.sockets.adapter.rooms[room].sockets).length === 1) {
        console.log('Reset list message in: ', room);
        listMesssages[room] = [];
      }
    })
  });

  socket.on('room:update-password', (data, callback) => {
    const rooms = omit([socket.id], socket.rooms);
    Object.keys(rooms).forEach(room => {
      roomConfig[room] = {
        ...(roomConfig[room] || {}),
        password: data.password
      };
      socket.to(room).emit('room:update-password', {
        from: socket.id,
        password: data.password,
      });
    });
    callback(data.password)
  })

  socket.on('peer:msg', (data) => {
    console.log('peer:msg - ' + data.type + ' from ' + data.from + ' to ' + data.to);
    io.to(data.to).emit('peer:msg', data);
  });

  socket.on('chat:msg', (data, callback) => {
    const rooms = omit([socket.id], socket.rooms);
    const message = {
      ...data,
      dateCreated: Date.now()
    };

    Object.keys(rooms).forEach(room => {
      listMesssages[room] = [
        ...(listMesssages[room] || []),
        message
      ];
      socket.to(room).emit('chat:msg', message);
    });

    callback(message);
  });

  socket.on('participant:msg', (data) => {
    console.log('participant:msg - ' + data.type + ' from ' + data.from + ' to ' + data.to);
    if (data.to === 'all') {
      const rooms = omit([socket.id], socket.rooms);
      console.log(rooms)
      Object.keys(rooms).forEach(room => socket.to(room).emit('participant:msg', data));
    } else {
      io.to(data.to).emit('participant:msg', data);
    }
  })
});

server.listen(9999);