import * as ActionTypes from './constants';

export const setDevices = (data) => ({
  type: ActionTypes.SET_DEVICES,
  payload: {
    ...data
  }
});