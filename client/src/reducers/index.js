import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import room from './room/store';
import participants from './participants/store';

export default combineReducers({
  routing,
  room,
  participants,
  lastActionType: (state = null, action) => action.type
})

export { default as patricipantsEnhancer } from './participants/enhancer/store';
export { default as participantsListener } from './participants/enhancer/listener';