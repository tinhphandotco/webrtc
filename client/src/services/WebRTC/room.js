import socket from './socket';

export const joinRoom = (roomName) => {
  return new Promise((res, rej) => {
    socket.emit('user:join-room', roomName, res);
  })
}