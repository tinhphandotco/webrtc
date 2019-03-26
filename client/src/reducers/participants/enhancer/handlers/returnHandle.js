import path from 'ramda/src/path';
import { ParticipantsEnhancerTypes } from 'actions';

const getLocalStream = (store, action, state) => {
  return path(['byId', state.localUser, 'localStream'], state);
};

const getParticipantsStream = (store, action, state) => {
  return state.allIds.map(id => ({ id, stream: path([id, 'localStream'], state.byId) }));
}

const handler = {
  [ParticipantsEnhancerTypes.ENHANCER_GET_LOCAL_STREAM]: getLocalStream,
  [ParticipantsEnhancerTypes.ENHANCER_GET_PARTICIPANTS_STREAM]: getParticipantsStream
}

export default handler;