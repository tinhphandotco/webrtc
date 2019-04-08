import compose from  'ramda/src/compose';

export const getRoomState = state => state.room;

export const getRoomName = compose(
  roomState => roomState.roomName,
  getRoomState
);