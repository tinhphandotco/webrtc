import compose from  'ramda/src/compose';

export const getRoomState = state => state.room;
export const getMyUserId = compose(
  roomState => roomState.users.me,
  getRoomState
);
