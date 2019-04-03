import io from 'socket.io-client';
import { SOCKET_URL } from 'config';

const socket = io(SOCKET_URL, { secure: true, rejectUnauthorized: false });

const connect = () => {
  return new Promise((res) => {
    socket.on('connect', () => res(socket.id));
  });
};

export {
  socket as default,
  connect,
};
