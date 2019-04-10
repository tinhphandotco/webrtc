import {
  makeActionsType
} from 'utils/common';

const prefixType = 'room.actions';
export const prefixToastActions = makeActionsType(prefixType);

export const CONNECT_SOCKET = prefixToastActions('CONNECT_SOCKET');
export const JOIN_ROOM = prefixToastActions('JOIN_ROOM');
export const SOCKET_MSG = prefixToastActions('SOCKET_MSG');
