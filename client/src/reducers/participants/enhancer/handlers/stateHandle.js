import { uuidv4 } from 'utils/common';
import { ParticipantsActions, ParticipantsTypes, ParticipantsEnhancerTypes } from 'actions';

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
}

const initLocalUser = (store, action, state) => {
  return {
    ...state,
    byId: {
      [action.payload.id]: {
        ...INIT_USER,
        ...action.payload
      }
    },
    localUser: action.payload.id,
    allIds: [action.payload.id],
    hashUpdate: uuidv4()
  }
}

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
  }
}

const handler = {
  [ParticipantsTypes.INIT_LOCAL_USER]: initLocalUser,
  [ParticipantsEnhancerTypes.ENHANCER_SET_LOCAL_STREAM]: setLocalStream
}

export default handler;