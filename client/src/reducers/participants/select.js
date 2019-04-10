import compose from 'ramda/src/compose';
import path from 'ramda/src/path';

export const getParticipantsState = state => state.participants;

export const getLocalUserInfo = compose(
  participantsState => participantsState.byId[participantsState.localUser],
  getParticipantsState
);

export const getLocalUserSettings = compose(
  path(['settings']),
  getLocalUserInfo
);

export const getAllStreams = compose(
  participantsState => participantsState.allIds.map(id => path('byId', id, 'stream'), participantsState),
  getParticipantsState
);

export const didGetUserMedia = compose(
  participantsState => participantsState.appState.didGetUserMedia,
  getParticipantsState
);

export const errorGetUserMedia = compose(
  participantsState => participantsState.appState.errorGetUserMedia,
  getParticipantsState
);

export const getSelectedParticipant = compose(
  participantsState => participantsState.byId[participantsState.appState.selectedUser],
  getParticipantsState
);