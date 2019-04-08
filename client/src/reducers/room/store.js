import { combineReducers } from 'redux';
import { RoomTypes, ParticipantsTypes } from 'actions';

const INITIAL_STATE = {
  roomName: '',
  users: [],
  appState: {
  }
};

const roomName = (state = INITIAL_STATE.roomName, { type, payload }) => {
  switch (type) {
    case RoomTypes.JOIN_ROOM:
      return payload.roomName;
    default:
      return state;
  }
};

const users = (state = INITIAL_STATE.users, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return [payload.id];
    default:
      return state;
  }
};

const appState = (state = INITIAL_STATE.appState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default combineReducers({
  roomName,
  users,
  appState
});
