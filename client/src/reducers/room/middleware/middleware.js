import io from 'socket.io-client';
import { SOCKET_URL } from 'config';
import * as service from './service';

import {
  RoomTypes,
  ParticipantsTypes,
} from 'actions';

const roomMiddleware = store => {
  let socket = null;

  return next => action => {
    if (action.type === RoomTypes.CONNECT_SOCKET) {
      socket = io(SOCKET_URL);

      socket.on('connect', () => service.connect(store, socket.id));

      socket.on('peer:msg', (data) => {
        service.handlePeerMsg(store, data);
      });

      socket.on('peer:connected', (data) => {
        service.handlePeerConnected(store, data);
      });

      socket.on('peer:disconnecting', (data) => {
        service.handlePeerDisconnecting(store, data);
      });
    }

    if (socket) {
      if (action.type === ParticipantsTypes.GET_USER_MEDIA) {
        service.getUserMedia(store, socket.id, action.payload.constrains);
      }

      if (action.type === RoomTypes.JOIN_ROOM) {
        socket.emit('user:join-room', action.payload.roomName);
      }

      if (action.type === RoomTypes.SOCKET_MSG) {
        socket.emit('peer:msg', action.payload.data);
      }
    } else {
      console.log('socket hasnt created yet!!!');
    }

    next(action);
  };
};

export default roomMiddleware;