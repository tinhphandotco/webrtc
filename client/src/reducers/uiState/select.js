import compose from  'ramda/src/compose';

export const getUIState = state => state.uiState;
export const isShowChat = compose(
  uiState => uiState.isShowChat,
  getUIState
);
export const isShowToolbar = compose(
  uiState => uiState.isShowToolbar,
  getUIState
);
export const isShowGridParticipants = compose(
  uiState => uiState.isShowGridParticipants,
  getUIState
);
