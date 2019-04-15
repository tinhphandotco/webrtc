import { UIStateTypes } from 'actions';

const INITIAL_STATE = {
  isShowGridParticipants: true,
  isShowChat: false,
  isShowToolbar: true
};

const uiState = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UIStateTypes.TOGGLE_CHAT:
      return {
        ...state,
        isShowChat: payload.chatState
      };

    case UIStateTypes.TOGGLE_GRID_LAYOUT:
      return {
        ...state,
        isShowGridParticipants: payload.gridState
      };

    case UIStateTypes.TOGGLE_TOOLBAR:
      return {
        ...state,
        isShowToolbar: payload.toolbarState
      };

    default:
      return state;
  }
};

export default uiState;
