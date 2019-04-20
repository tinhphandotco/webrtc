import { ParticipantsEnhancerActions } from 'actions';
import * as ActionTypes from './constants';

export const initLocalUser = (config) => {
  return {
    type: ActionTypes.INIT_LOCAL_USER,
    payload: {
      ...config
    }
  };
};

export const setLocalStream = (localUserId, fakeStream) => {
  return {
    type: ActionTypes.SET_LOCAL_STREAM,
    payload: {
      localUserId,
      stream: fakeStream
    }
  };
};

export const initRemoteUser = (config) => {
  return {
    type: ActionTypes.INIT_REMOTE_USER,
    payload: {
      ...config
    }
  };
};

export const setRemoteStream = (remoteUserId, fakeStream) => {
  return {
    type: ActionTypes.SET_REMOTE_STREAM,
    payload: {
      remoteUserId,
      stream: fakeStream
    }
  };
};

export const getUserMedia = (constrains) => {
  return {
    type: ActionTypes.GET_USER_MEDIA,
    payload: {
      constrains
    }
  };
};

export const getShareScreen = () => ({
  type: ActionTypes.GET_SHARE_SCREEN,
});

export const errorGetUserMedia = (error) => ({
  type: ActionTypes.GET_ERROR_USER_MEDIA,
  payload: {
    error
  }
});

export const closeShareScreen = () => ({
  type: ActionTypes.CLOSE_SHARE_SCREEN,
});

export const participantDisconecting = (participantId) => (dispatch) => {
  const localParticipantId = dispatch(ParticipantsEnhancerActions.enhancerGetLocalParticipantId());
  dispatch({
    type: ActionTypes.PARTICIPANT_DISCONNECTING,
    payload: {
      participantId,
      localUser: localParticipantId,
    }
  });
};

export const setSelectParticipant = (participantId) => ({
  type: ActionTypes.SET_SELECT_PARTICIPANT,
  payload: {
    participantId
  }
});

export const setStateShareScreen = (state) => ({
  type: ActionTypes.SET_STATE_SHARE_SCREEN,
  payload: {
    state
  }
});

export const setSettingDevices = (participantId, settings) => ({
  type: ActionTypes.SET_SETTING_DEVICES,
  payload: {
    participantId,
    settings,
  }
});

export const socketMsg = (data) => {
  return { type: ActionTypes.SOCKET_MSG, payload: { data } };
};