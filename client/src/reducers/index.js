import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import room from './room/store';
import users from './users/store';

export default combineReducers({
  routing,
  room,
  users
})

export { default as connectionEnhancer } from './connectionEnhancer/store';