import { mapByProp } from 'utils/common';
import { ChatTypes, RoomTypes } from 'actions';

const INITIAL_STATE = {
  byId: {},
  allIds: []
};

export default function chat(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case RoomTypes.LEAVE_ROOM:
      return INITIAL_STATE;

    case ChatTypes.LIST_MESSAGES:
      return {
        byId: {
          ...state.byId,
          ...mapByProp('uniqueId', payload.listMessages)
        },
        allIds: [...state.allIds, ...payload.listMessages.map(item => item.uniqueId)]
      };

    case ChatTypes.RECEIVE_MESSAGE:
    case ChatTypes.SEND_MESSAGE:
      return {
        byId: {
          ...state.byId,
          [payload.uniqueId]: payload
        },
        allIds: [...state.allIds, payload.uniqueId]
      };

    case ChatTypes.MESSAGE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.uniqueId]: {
            ...state.byId[payload.uniqueId],
            dateCreated: payload.dateCreated,
            status: 'success'
          }
        }
      };

    case ChatTypes.MESSAGE_ERROR:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.uniqueId]: {
            ...state.byId[payload.uniqueId],
            status: 'fail'
          }
        }
      };

    default:
      return state;
  }
}
