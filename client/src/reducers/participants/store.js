import { combineReducers } from 'redux';
import { omit } from 'ramda';
import { ParticipantsTypes, ParticipantsEnhancerTypes } from 'actions';

const INIT_USER = {
  id: null,
  peerConnection: null,
  localStream: null,
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

    // case ParticipantsEnhancerTypes.ENHANCER_SET_LOCAL_STREAM:
    //   return {
    //     ...state,
    //     [payload.localUserId]: {
    //       ...state[payload.localUserId],
    //       stream: payload.stream
    //     }
    //   };

    case ParticipantsTypes.SET_LOCAL_STREAM:
      return {
        ...state,
        [payload.localUserId]: {
          ...state[payload.localUserId],
          localStream: payload.stream
        }
      };

    case ParticipantsEnhancerTypes.ENHANCER_INITE_REMOTE_USER:
      return {
        ...state,
        [payload.userId]: {
          ...INIT_REMOTE_USER,
          id: payload.userId,
          peerConnection: payload.peerConnection,
        }
      };

    // case ParticipantsTypes.INIT_REMOTE_USER:
    //   return {
    //     ...state,
    //     [payload.id]: {
    //       ...INIT_REMOTE_USER,
    //       ...payload
    //     }
    //   };

    case ParticipantsTypes.SET_REMOTE_STREAM:
      return {
        ...state,
        [payload.remoteUserId]: {
          ...state[payload.remoteUserId],
          localStream: payload.stream
        }
      };

    case ParticipantsTypes.ENHANCER_PARTICIPANT_DISCONECTING:
      return omit([payload.participantId], state);

    case ParticipantsTypes.SET_LOCAL_SETTING_DEVICES:
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
              ...payload.settings.audio
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
      return [...state, payload.id];

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

    case ParticipantsTypes.PARTICIPANT_DISCONNECTING:
      return {
        ...state,
        selectedUser: payload.participantId === state.selectedUser
          ? payload.localUser
          : payload.participantId
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
