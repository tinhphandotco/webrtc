import { omit } from 'ramda';
import { ParticipantsTypes, ParticipantsEnhancerTypes } from 'actions';

const INIT_LOCAL_USER = {
  id: null,
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

const initLocalUser = (store, action) => {
  return {
    byId: {
      [action.payload.id]: {
        ...INIT_LOCAL_USER,
        ...action.payload
      }
    },
    localUser: action.payload.id,
    allIds: [action.payload.id],
    appState: {
      selectedUser: action.payload.id
    }
  };
};

const setLocalStream = (store, action, state) => {
  return {
    ...state,
    byId: {
      ...state.byId,
      [state.localUser]: {
        ...state.byId[state.localUser],
        stream: action.payload.stream
      }
    },
  };
};

const initRemoteUser = (store, action, state) => ({
  ...state,
  byId: {
    ...state.byId,
    [action.payload.userId]: {
      ...INIT_REMOTE_USER,
      id: action.payload.userId,
      peerConnection: action.payload.peerConnection,
    }
  },
  allIds: [...state.allIds, action.payload.userId],
});

const setRemoteStream = (store, action, state) => {
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.remoteUserId]: {
        ...state.byId[action.payload.remoteUserId],
        stream: action.payload.stream
      }
    },
  };
};

const participantDisconecting = (store, action, state) => {
  return {
    ...state,
    byId: omit([action.payload.participantId], state.byId),
    allIds: state.allIds.filter(id => id !== action.payload.participantId),
    appState: {
      selectedUser: state.appState.selectedUser === action.payload.participantId
        ? state.localUser
        : state.appState.selectedUser
    }
  };
};

const setSelectParticipant = (store, action, state) => ({
  ...state,
  appState: {
    selectedUser: action.payload.participantId
  }
});

const handler = {
  [ParticipantsTypes.INIT_LOCAL_USER]: initLocalUser,
  [ParticipantsEnhancerTypes.ENHANCER_SET_LOCAL_STREAM]: setLocalStream,
  [ParticipantsEnhancerTypes.ENHANCER_INITE_REMOTE_USER]: initRemoteUser,
  [ParticipantsEnhancerTypes.ENHANCER_SET_REMOTE_STREAM]: setRemoteStream,
  [ParticipantsEnhancerTypes.ENHANCER_PARTICIPANT_DISCONECTING]: participantDisconecting,
  [ParticipantsEnhancerTypes.ENHANCER_SET_SELECT_PARTICIPANT]: setSelectParticipant
};

export default handler;