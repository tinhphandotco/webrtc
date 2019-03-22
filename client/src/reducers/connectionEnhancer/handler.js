import { UsersActions, UsersTypes, ConnectionTypes } from 'actions';
import { uuidv4 } from 'utils/common';

const setLocalStream = ({ dispatch }, action) => {
  return {
    localStream: action.payload.stream,
    __callback__: () => dispatch(UsersActions.setLocalStream(action.payload.localUserId, uuidv4()))
  }
}

const getLocalStream = (store, action, connectionState) => ({
  __return__: connectionState.localStream,
})
const handler = {
  [ConnectionTypes.ENHANCER_SET_LOCAL_STREAM]: setLocalStream,
  [ConnectionTypes.ENHANCER_GET_LOCAL_STREAM]: getLocalStream
}

export default handler;