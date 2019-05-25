import { compose } from 'ramda';
import { path } from 'ramda';

export const getParticipantsState = state => state.participants;

export const getLocalUserInfo = compose(
  participantsState => participantsState.byId[participantsState.localUser],
  getParticipantsState
);

export const getLocalParticipantId = compose(
  participantsState => participantsState.localUser,
  getParticipantsState
);

export const getAllStreams = compose(
  participantsState => participantsState.allIds.map(id => path(['byId', id, 'stream'], participantsState)),
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

export const isSharingScreen = compose(
  participantsState => participantsState.appState.isSharingScreen,
  getParticipantsState
);

export const localParticipantSettings = compose(
  path(['settings']),
  getLocalUserInfo
);

export const listParticipantSetting = compose(
  participantsState => participantsState.allIds.reduce((acc, id) => ({
    ...acc,
    [id]: {
      id,
      settings: path(['byId', id, 'settings'], participantsState)
    }
  }), {}),
  getParticipantsState
);

export const getUserInfoById = (participantId) => compose(
  participantsState => path(['byId', participantId], participantsState),
  getParticipantsState
);

export const getParticipantSettingById = (participantId) => compose(
  participantInfo => path(['settings'], participantInfo),
  getUserInfoById(participantId)
);

export const getRemoteParticipants = compose(
  participantsState => participantsState.allIds
    .filter(id => id !== participantsState.localUser)
    .map(id => path(['byId', id], participantsState)),
  getParticipantsState
);

export const getParticipantsStream = compose(
  participantsState => participantsState.allIds
    .map(id => ({ id, stream: path(['byId', id, 'stream'], participantsState) })),
  getParticipantsState,
);