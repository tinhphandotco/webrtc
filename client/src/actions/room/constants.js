import {
  makeActionsType
} from 'utils/common';

const prefixType = 'room.actions';
export const prefixToastActions = makeActionsType(prefixType);

export const CONNECT_SOCKET = prefixToastActions('CONNECT_SOCKET');
export const JOIN_ROOM = prefixToastActions('JOIN_ROOM');
export const SOCKET_MSG = prefixToastActions('SOCKET_MSG');
export const LEAVE_ROOM = prefixToastActions('LEAVE_ROOM');
export const SEND_UPDATE_PASSWORD = prefixToastActions('SEND_UPDATE_PASSWORD');
export const UPDATE_PASSWORD = prefixToastActions('UPDATE_PASSWORD');
export const LOGIN_SUCCESS = prefixToastActions('LOGIN_SUCCESS');
export const LOGIN_FAIL = prefixToastActions('LOGIN_FAIL');
export const RESET_LOGIN_MESSAGE_ERROR = prefixToastActions('RESET_LOGIN_MESSAGE_ERROR');
export const ROOM_CONFIG = prefixToastActions('ROOM_CONFIG');
export const LOGIN_ROOM = prefixToastActions('LOGIN_ROOM');
export const SET_PASSWORD = prefixToastActions('SET_PASSWORD');
