import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const connect = () => {
  return new Promise((res, rej) => {
    socket.on('connect', () => res(socket.id));
  })
}

export {
  socket as default,
  connect,
};
