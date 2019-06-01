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
export const GET_ROOM_PASSWORD_FROM_SERVER = prefixToastActions('GET_ROOM_PASSWORD_FROM_SERVER');
