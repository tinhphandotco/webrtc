import { PlayerAPI } from 'api';
import * as ActionTypes from './constants';

export const initLocalUser = (config) => {
  return { type: ActionTypes.INIT_LOCAL_USER, payload: { ...config } };
}