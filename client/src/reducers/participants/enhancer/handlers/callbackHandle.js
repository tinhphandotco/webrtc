import { uuidv4 } from 'utils/common';
import { ParticipantsEnhancerTypes, ParticipantsActions } from 'actions';

const setLocalStream = (store, action) => {
  store.dispatch(ParticipantsActions.setLocalStream(action.payload.localUserId, uuidv4()));
};

const handler = {
  [ParticipantsEnhancerTypes.ENHANCER_SET_LOCAL_STREAM]: setLocalStream
};

export default handler;