import * as ActionTypes from './constants';

export const joinRoom = (roomName) => {
  return { type: ActionTypes.JOIN_ROOM, payload: { roomName } };
};

export const socketMsg = (data) => {
  return { type: ActionTypes.SOCKET_MSG, payload: { data } };
};