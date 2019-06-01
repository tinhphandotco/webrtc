import { combineReducers } from 'redux';
import { RoomTypes, ParticipantsTypes } from 'actions';

const INITIAL_STATE = {
  roomName: '',
  password: null,
  users: [],
  appState: {
    isLogged: false,
    hasPassword: false,
    messageError: null,
  }
};

const password = (state = INITIAL_STATE.password, { type, payload }) => {
  switch (type) {
    case RoomTypes.SET_PASSWORD:
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
    case RoomTypes.ROOM_CONFIG:
      return payload.hasPassword ? { ...state, hasPassword: true } : { ...state, isLogged: true };

    case RoomTypes.LOGIN_SUCCESS:
      return { ...state, isLogged: true };

    case RoomTypes.LOGIN_FAIL:
      return { ...state, messageError: payload.messageError };

    case RoomTypes.RESET_LOGIN_MESSAGE_ERROR:
      return { ...state, messageError: INITIAL_STATE.appState.messageError };

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
