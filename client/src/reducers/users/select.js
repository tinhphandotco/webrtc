import compose from 'ramda/src/compose';
import { getMyUserId } from '../room/select';

export const getUsersState = state => state.users;
export const getUserInfoById = (userId) => compose(
  usersState => usersState.byId[userId],
  getUsersState
);
export const getMySetting = (userId) => compose(
  userInfo => userInfo.settings,
  getUserInfoById(userId)
);