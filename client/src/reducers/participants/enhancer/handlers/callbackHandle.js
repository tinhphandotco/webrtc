import { uuidv4 } from 'utils/common';
import { ParticipantsEnhancerTypes, ParticipantsActions } from 'actions';

const setLocalStream = (store, action) => {
  store.dispatch(ParticipantsActions.setLocalStream(action.payload.localUserId, uuidv4()));
};

const setRemoteStream = (store, action) => {
  store.dispatch(ParticipantsActions.setRemoteStream(action.payload.remoteUserId, uuidv4()));
};

const handler = {
  [ParticipantsEnhancerTypes.ENHANCER_SET_LOCAL_STREAM]: setLocalStream,
  [ParticipantsEnhancerTypes.ENHANCER_SET_REMOTE_STREAM]: setRemoteStream,
};

export default handler;