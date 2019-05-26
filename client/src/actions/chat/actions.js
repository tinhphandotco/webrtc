import { uuidv4 } from 'utils/common';
import * as ActionTypes from './constants';
import {
  getLocalParticipantId,
} from 'reducers/participants/select';

export const sendChat = (content) => (dispatch, getState)  => {
  dispatch({
    type: ActionTypes.SEND_MESSAGE,
    payload: {
      content,
      uniqueId: uuidv4(),
      userId: getLocalParticipantId(getState()),
      me: true,
      dateCreated: Date.now(),
      status: 'pending',
    }
  });
};