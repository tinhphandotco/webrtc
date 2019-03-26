import * as ActionTypes from './constants';

export const enhancerGetLocalStream = () => ({
  type: ActionTypes.ENHANCER_GET_LOCAL_STREAM
});

export const enhancerGetParticipantsStream = () => ({
  type: ActionTypes.ENHANCER_GET_PARTICIPANTS_STREAM
});

export const enhancerSetLocalStream = (localUserId, stream) => {
  return {
    type: ActionTypes.ENHANCER_SET_LOCAL_STREAM,
    payload: {
      localUserId,
      stream
    }
  }
}