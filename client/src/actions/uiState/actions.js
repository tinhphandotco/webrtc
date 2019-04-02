import * as ActionTypes from './constants';

export const toggleChat = (chatState) => {
  return { type: ActionTypes.TOGGLE_CHAT, payload: { chatState } };
};

export const toggleGridLayout = (gridState) => {
  return { type: ActionTypes.TOGGLE_GRID_LAYOUT, payload: { gridState } };
};

export const toggleToolbar = (toolbarState) => {
  return { type: ActionTypes.TOGGLE_TOOLBAR, payload: { toolbarState } };
};