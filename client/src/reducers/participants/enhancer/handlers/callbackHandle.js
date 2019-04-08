import { uuidv4 } from 'utils/common';
import { ParticipantsEnhancerTypes, ParticipantsActions } from 'actions';

const setLocalStream = (store, action) => {
  store.dispatch(ParticipantsActions.setLocalStream(action.payload.localUserId, uuidv4()));
};

const setRemoteStream = (store, action) => {
  store.dispatch(ParticipantsActions.setRemoteStream(action.payload.remoteUserId, uuidv4()));
};

const initRemoteUser = (store, action) => {
  store.dispatch(ParticipantsActions.initRemoteUser({ id: action.payload.userId }));
};

const participantDisconecting = (store, action) => {
  store.dispatch(ParticipantsActions.participantDisconecting(action.payload.participantId));
};

const handler = {
  [ParticipantsEnhancerTypes.ENHANCER_SET_LOCAL_STREAM]: setLocalStream,
  [ParticipantsEnhancerTypes.ENHANCER_SET_REMOTE_STREAM]: setRemoteStream,
  [ParticipantsEnhancerTypes.ENHANCER_INITE_REMOTE_USER]: initRemoteUser,
  [ParticipantsEnhancerTypes.ENHANCER_PARTICIPANT_DISCONECTING]: participantDisconecting
};

export default handler;