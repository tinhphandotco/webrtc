import { combineReducers } from 'redux';
import { omit, path } from 'ramda';
import { ParticipantsTypes, RoomTypes } from 'actions';

const INIT_USER = {
  id: null,
  peerConnection: null,
  stream: null,
  settings: {
    video: {
      active: false,
      enable: false,
    },
    audio: {
      active: false,
      enable: false,
    }
  }
};

const INIT_REMOTE_USER = {
  id: null,
  peerConnection: null,
  stream: null,
  settings: {
    video: {
      active: false,
      enable: false,
    },
    audio: {
      active: false,
      enable: false,
    }
  }
};

const INITIAL_STATE = {
  byId: {},
  allIds: [],
  localUser: null,
  appState: {
    selectedUser: null,
    isSharingScreen: false,
    didGetUserMedia: false,
    errorGetUserMedia: null
  }
};

const byId = (state = INITIAL_STATE.byId, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return {
        [payload.id]: {
          ...INIT_USER,
          ...payload
        }
      };

    case ParticipantsTypes.SET_LOCAL_STREAM:
      return {
        ...state,
        [payload.localUserId]: {
          ...state[payload.localUserId],
          stream: payload.stream
        }
      };

    case ParticipantsTypes.INIT_REMOTE_USER:
      return {
        ...state,
        [payload.userId]: {
          ...INIT_REMOTE_USER,
          id: payload.userId,
          peerConnection: payload.peerConnection,
        }
      };

    case ParticipantsTypes.SET_REMOTE_STREAM:
      return {
        ...state,
        [payload.remoteUserId]: {
          ...state[payload.remoteUserId],
          stream: payload.stream
        }
      };

    case RoomTypes.LEAVE_ROOM:
    case ParticipantsTypes.PARTICIPANT_DISCONNECTING: {
      const participant = path([payload.participantId], state);
      const stream = path(['stream'], participant);
      const connection = path(['peerConnection'], participant);

      if (stream) {
        stream.getVideoTracks().forEach(track => track.stop());
        stream.getAudioTracks().forEach(track => track.stop());
      }

      if (connection) {
        connection.close();
      }

      return omit([payload.participantId], state);
    }

    case ParticipantsTypes.SET_LOCAL_SETTING_SHARING_SCREEN:
      return {
        ...state,
        [payload.participantId]: {
          ...state[payload.participantId],
          settings: {
            ...state[payload.participantId].settings,
            video: {
              ...state[payload.participantId].settings.video,
              ...payload.settings.video
            },
          }
        }
      };

    case ParticipantsTypes.SET_LOCAL_SETTING_DEVICES: {
      const stream = path([payload.participantId, 'stream'], state);
      if (stream) {
        if (payload.settings.hasOwnProperty('video')) {
          stream.getVideoTracks().forEach(track => track.enabled = payload.settings.video.enable);
        }

        if (payload.settings.hasOwnProperty('audio')) {
          stream.getAudioTracks().forEach(track => track.enabled = payload.settings.audio.enable);
        }
      }

      return {
        ...state,
        [payload.participantId]: {
          ...state[payload.participantId],
          stream,
          settings: {
            video: {
              ...state[payload.participantId].settings.video,
              ...payload.settings.video
            },
            audio: {
              ...state[payload.participantId].settings.audio,
              ...payload.settings.audio
            }
          }
        }
      };
    }

    case ParticipantsTypes.SET_SETTING_DEVICES:
      return {
        ...state,
        [payload.participantId]: {
          ...state[payload.participantId],
          settings: {
            video: {
              ...state[payload.participantId].settings.video,
              ...payload.settings.video
            },
            audio: {
              ...state[payload.participantId].settings.audio,
              ...(payload.settings.audio || {})
            }
          }
        }
      };

    default:
      return state;
  }
};

const allIds = (state = INITIAL_STATE.allIds, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return [payload.id];

    case ParticipantsTypes.INIT_REMOTE_USER:
      return [...state, payload.userId];

    case RoomTypes.LEAVE_ROOM:
    case ParticipantsTypes.PARTICIPANT_DISCONNECTING:
      return state.filter(id => id !== payload.participantId);

    default:
      return state;
  }
};

const localUser = (state = INITIAL_STATE.localUser, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return payload.id;

    case RoomTypes.LEAVE_ROOM:
      return INITIAL_STATE.localUser;

    default:
      return state;
  }
};

const appState = (state = INITIAL_STATE.appState, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return {
        ...state,
        selectedUser: payload.id
      };

    case ParticipantsTypes.SET_SELECT_PARTICIPANT:
      return {
        ...state,
        selectedUser: payload.participantId
      };

    case ParticipantsTypes.SET_LOCAL_STREAM:
      return {
        ...state,
        didGetUserMedia: true
      };

    case ParticipantsTypes.GET_ERROR_USER_MEDIA:
      return {
        ...state,
        didGetUserMedia: true,
        errorGetUserMedia: payload.error
      };

    case RoomTypes.LEAVE_ROOM:
      return INITIAL_STATE.appState;

    case ParticipantsTypes.PARTICIPANT_DISCONNECTING:
      return {
        ...state,
        selectedUser: payload.participantId === state.selectedUser
          ? payload.localUser
          : state.selectedUser
      };

    case ParticipantsTypes.SET_STATE_SHARE_SCREEN:
      return {
        ...state,
        isSharingScreen: payload.state
      };

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
  localUser,
  appState
});
