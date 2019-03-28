import { uuidv4 } from 'utils/common';
import { ParticipantsTypes, ParticipantsEnhancerTypes } from 'actions';

const INIT_LOCAL_USER = {
  id: null,
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
  remoteStream: null,
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

const initLocalUser = (store, action, state) => {
  return {
    ...state,
    byId: {
      [action.payload.id]: {
        ...INIT_LOCAL_USER,
        ...action.payload
      }
    },
    localUser: action.payload.id,
    allIds: [action.payload.id],
    hashUpdate: uuidv4()
  };
};

const setLocalStream = (store, action, state) => {
  return {
    ...state,
    byId: {
      [state.localUser]: {
        ...state.byId[state.localUser],
        localStream: action.payload.stream
      }
    },
    hashUpdate: uuidv4()
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
  hashUpdate: uuidv4()
});

const handler = {
  [ParticipantsTypes.INIT_LOCAL_USER]: initLocalUser,
  [ParticipantsEnhancerTypes.ENHANCER_SET_LOCAL_STREAM]: setLocalStream,
  [ParticipantsEnhancerTypes.ENHANCER_INITE_REMOTE_USER]: initRemoteUser
};

export default handler;