import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import room from './room/store';
import participants from './participants/store';
import uiState from './uiState/store';
import devices from './devices/store';
import chat from './chat/store';


import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  room,
  participants,
  uiState,
  devices,
  chat,
});

export { default as participantsListener } from './participants/enhancer/listener';
export { default as roomMiddleware } from './room/middleware';