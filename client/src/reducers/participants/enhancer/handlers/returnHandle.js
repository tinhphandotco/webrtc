import { path } from 'ramda';
import { ParticipantsEnhancerTypes } from 'actions';

const getParticipantsStream = (store, action, state) => {
  return state.allIds.map(id => ({ id, stream: path([id, 'stream'], state.byId) }));
};

const getLocalUserInfo = (store, action, state) => {
  return path(['byId', state.localUser], state);
};

const getLocalParticipantId = (store, action, state) => {
  return path(['byId', state.localUser, 'id'], state);
};

const getLocalStream = (store, action, state) => {
  return path(['byId', state.localUser, 'stream'], state);
};

const getUserInfoById = (store, action, state) => {
  return path(['byId', action.payload.id], state);
};

const getSelectedParticipant = (store, action, state) => {
  return path(['byId', state.appState.selectedUser], state) || {};
};

const getSelectedParticipantId = (store, action, state) => {
  return getSelectedParticipant(store, action, state).id;
};

const getRemoteParticipants = (store, action, state) => {
  const remoteIds = state.allIds.filter(id => id !== state.localUser);
  return remoteIds.map(id => path(['byId', id], state));
};

const isSharingScreen = (store, action, state) => {
  console.log('isSharingScreen: ', JSON.stringify(state));
  return state.appState.isSharingScreen;
};

const handler = {
  [ParticipantsEnhancerTypes.ENHANCER_GET_LOCAL_STREAM]: getLocalStream,
  [ParticipantsEnhancerTypes.ENHANCER_GET_PARTICIPANTS_STREAM]: getParticipantsStream,
  [ParticipantsEnhancerTypes.ENHANCER_GET_LOCAL_USER_INFO]: getLocalUserInfo,
  [ParticipantsEnhancerTypes.ENHANCER_GET_LOCAL_PARTICIPANT_ID]: getLocalParticipantId,
  [ParticipantsEnhancerTypes.ENHANCER_GET_USER_INFOR_BY_ID]: getUserInfoById,
  [ParticipantsEnhancerTypes.ENHANCER_GET_SELECTED_PARTICIPANT]: getSelectedParticipant,
  [ParticipantsEnhancerTypes.ENHANCER_GET_SELECTED_PARTICIPANT_ID]: getSelectedParticipantId,
  [ParticipantsEnhancerTypes.ENHANCER_GET_REMOTE_PARTICIPANTS]: getRemoteParticipants,
  [ParticipantsEnhancerTypes.ENHANCER_IS_SHARING_SCREEN]: isSharingScreen
};

export default handler;