import * as ActionTypes from './constants';

export const joinRoom = (roomName) => {
  return { type: ActionTypes.JOIN_ROOM, payload: { roomName } };
};