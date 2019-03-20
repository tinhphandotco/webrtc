import compose from 'ramda/src/compose';
import path from 'ramda/src/path';

export const getUsersState = state => state.users;
export const getLocalUserInfo = compose(
  usersState => usersState.byId[usersState.localUser],
  getUsersState
);
export const getLocalUserSettings = compose(
  path(['settings']),
  getLocalUserInfo
);