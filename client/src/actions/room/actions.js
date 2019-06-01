import * as ActionTypes from './constants';
import {
  getLocalParticipantId,
} from 'reducers/participants/select';

export const connectSocket = () => ({
  type: ActionTypes.CONNECT_SOCKET,
});

export const joinRoom = (roomName) => {
  return { type: ActionTypes.JOIN_ROOM, payload: { roomName } };
};

export const socketMsg = (data) => {
  return { type: ActionTypes.SOCKET_MSG, payload: { data } };
};

export const leaveRoom = () => (dispatch, getState) => dispatch({
  type: ActionTypes.LEAVE_ROOM,
  payload: {
    participantId: getLocalParticipantId(getState())
  }
});

export const updatePassword = (password) => ({
  type: ActionTypes.SEND_UPDATE_PASSWORD,
  payload: {
    password,
  }
});