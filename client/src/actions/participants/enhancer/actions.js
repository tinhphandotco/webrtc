import * as ActionTypes from './constants';

export const enhancerGetLocalStream = () => ({
  type: ActionTypes.ENHANCER_GET_LOCAL_STREAM
});

export const enhancerGetParticipantsStream = () => ({
  type: ActionTypes.ENHANCER_GET_PARTICIPANTS_STREAM
});

export const enhancerSetLocalStream = (localUserId, stream) => ({
  type: ActionTypes.ENHANCER_SET_LOCAL_STREAM,
  payload: {
    localUserId,
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