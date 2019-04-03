import path from 'ramda/src/path';
import { ParticipantsEnhancerTypes } from 'actions';

const getParticipantsStream = (store, action, state) => {
  return state.allIds.map(id => ({ id, stream: path([id, 'stream'], state.byId) }));
};

const getLocalUserInfo = (store, action, state) => {
  return path(['byId', state.localUser], state);
};

const getLocalStream = (store, action, state) => {
  return path(['byId', state.localUser, 'stream'], state);
};

const getUserInfoById = (store, action, state) => {
  return path(['byId', action.payload.id], state);
};

const handler = {
  [ParticipantsEnhancerTypes.ENHANCER_GET_LOCAL_STREAM]: getLocalStream,
  [ParticipantsEnhancerTypes.ENHANCER_GET_PARTICIPANTS_STREAM]: getParticipantsStream,
  [ParticipantsEnhancerTypes.ENHANCER_GET_LOCAL_USER_INFO]: getLocalUserInfo,
  [ParticipantsEnhancerTypes.ENHANCER_GET_USER_INFOR_BY_ID]: getUserInfoById
};

export default handler;