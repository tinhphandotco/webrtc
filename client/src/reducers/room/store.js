import { combineReducers } from 'redux';
import { RoomTypes, ParticipantsTypes } from 'actions';

const INITIAL_STATE = {
  roomName: '',
  password: null,
  users: [],
  appState: {
    isLogged: false,
  }
};

const password = (state = INITIAL_STATE.password, { type, payload }) => {
  switch (type) {
    case RoomTypes.GET_ROOM_PASSWORD_FROM_SERVER:
      return payload.password;

    case RoomTypes.UPDATE_PASSWORD:
      return payload.password;
    default:
      return state;
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

const appState = (state = INITIAL_STATE.appState, { type, payload }) => {
  switch (type) {
    case RoomTypes.GET_ROOM_PASSWORD_FROM_SERVER:
      return payload.password === '' ? { ...state, isLogged: true } : state;

    default:
      return state;
  }
};

export default combineReducers({
  roomName,
  password,
  users,
  appState
});
