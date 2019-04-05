import compose from  'ramda/src/compose';

export const getRoomState = state => state.room;

export const didConnectToSocket = compose(
  roomState => roomState.appState.didConnectToSocket,
  getRoomState
);