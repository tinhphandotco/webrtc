import { compose, path } from  'ramda';

export const getChatState = state => state.chat;

export const getListMessages = compose(
  chatState => chatState.allIds.map(id => path(['byId', id], chatState)),
  getChatState
);