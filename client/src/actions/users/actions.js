import { PlayerAPI } from 'api';
import * as ActionTypes from './constants';

export const initLocalUser = (config) => {
  return {
    type: ActionTypes.INIT_LOCAL_USER,
    payload: {
      ...config
    }
  };
}

export const setLocalStream = (localUserId, stream) => {
  console.log('actions: setLocalStream ', JSON.stringify(stream))
  return {
    type: ActionTypes.SET_LOCAL_STREAM,
    payload: {
      localUserId,
      stream
    }
  }
}