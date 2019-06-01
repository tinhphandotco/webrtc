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

export const hasPassword = compose(
  roomState => roomState.appState.hasPassword,
  getRoomState
);

export const isLogged = compose(
  roomState => roomState.appState.isLogged,
  getRoomState
);

export const loginMessageError = compose(
  roomState => roomState.appState.messageError,
  getRoomState
);