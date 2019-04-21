import { compose } from 'ramda';
import path from 'ramda/src/path';

export const getParticipantsState = state => state.participants;

export const getLocalUserInfo = compose(
  participantsState => participantsState.byId[participantsState.localUser],
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

export const getParticipantSettingById = (participantId) => compose(
  participantsState => path(['byId', participantId, 'settings'], participantsState),
  getParticipantsState
);