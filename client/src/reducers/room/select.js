import compose from  'ramda/src/compose';

export const getRoomState = state => state.room;

export const getRoomName = compose(
  roomState => roomState.roomName,
  getRoomState
);

export const getRoomPassword = compose(
  roomState => roomState.password,
  getRoomState
);

export const didGetRoomPasswordFromServer = compose(
  roomState => roomState.password !== null,
  getRoomState
);

export const isLogged = compose(
  roomState => roomState.appState.isLogged,
  getRoomState
);