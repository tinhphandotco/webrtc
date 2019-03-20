import io from 'socket.io-client';
import { SOCKET_URL } from 'config';

const socket = io(SOCKET_URL);

const connect = () => {
  return new Promise((res, rej) => {
    socket.on('connect', () => res(socket.id));
  })
}

export {
  socket as default,
  connect,
};
