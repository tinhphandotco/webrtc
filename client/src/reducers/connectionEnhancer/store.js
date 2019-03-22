import handler from './handler';
import path from 'ramda/src/path';

const connectionEnhancer = () => {
  let connectionState = {
    localStream: null,
    peerById: {},
    allPeerIds: []
  };

  return store => next => action => {
    const result = handler[action.type] ? handler[action.type](store, action, connectionState) : {};

    console.log('connectionEnhancer: ', { action, connectionState, result });

    if (path(['__return__'], result)) { return result.__return__; }

    connectionState = {
      localStream: path(['localStream'], result) || connectionState.localStream,
      peerById: path(['peerById'], result) || connectionState.peerById,
      allPeerIds: path(['allPeerIds'], result) || connectionState.allPeerIds,
    };

    next(action);

    if (path(['__callback__'], result)) { result.__callback__() }
  }
}

export default connectionEnhancer;
