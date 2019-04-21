import * as ActionTypes from './constants';

export const enhancerGetLocalStream = () => ({
  type: ActionTypes.ENHANCER_GET_LOCAL_STREAM
});

export const enhancerGetLocalUserInfo = () => ({
  type: ActionTypes.ENHANCER_GET_LOCAL_USER_INFO
});

export const enhancerGetLocalParticipantId = () => ({
  type: ActionTypes.ENHANCER_GET_LOCAL_PARTICIPANT_ID
});

export const enhancerGetUserInfoById = (id) => ({
  type: ActionTypes.ENHANCER_GET_USER_INFOR_BY_ID,
  payload: { id }
});

export const enhancerGetParticipantsStream = () => ({
  type: ActionTypes.ENHANCER_GET_PARTICIPANTS_STREAM
});

export const enhancerGetSelectedParticipant = () => ({
  type: ActionTypes.ENHANCER_GET_SELECTED_PARTICIPANT
});

export const enhancerGetSelectedParticipantId = () => ({
  type: ActionTypes.ENHANCER_GET_SELECTED_PARTICIPANT_ID
});

export const enhancerSetSelectParticipant = (participantId) => ({
  type: ActionTypes.ENHANCER_SET_SELECT_PARTICIPANT,
  payload: {
    participantId
  }
});

export const enhancerGetRemoteParticipants = () => ({
  type: ActionTypes.ENHANCER_GET_REMOTE_PARTICIPANTS,
});

export const enhancerSetLocalStream = (localUserId, stream) => ({
  type: ActionTypes.ENHANCER_SET_LOCAL_STREAM,
  payload: {
    localUserId,
    stream
  }
});

export const enhancerSetRemoteStream = (remoteUserId, stream) => ({
  type: ActionTypes.ENHANCER_SET_REMOTE_STREAM,
  payload: {
    remoteUserId,
    stream
  }
});

export const enhancerInitRemoteUser = (userId, peerConnection) => ({
  type: ActionTypes.ENHANCER_INITE_REMOTE_USER,
  payload: {
    userId,
    peerConnection
  }
});

export const enhancerParticipantDisconecting = (participantId) => ({
  type: ActionTypes.ENHANCER_PARTICIPANT_DISCONECTING,
  payload: {
    participantId
  }
});

export const enhancerSetStream = (stream) => ({
  type: ActionTypes.ENHANCER_SET_STREAM,
  payload: {
    stream,
  }
});