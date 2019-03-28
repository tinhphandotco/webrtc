import stateHandler from './handlers/stateHandle';
import returnHandler from './handlers/returnHandle';
import callbackHandler from './handlers/callbackHandle';

export let patricipantsEnhancerState = {
  byId: {},
  allIds: [],
  localUser: null,
  hashUpdate: null,
};

const patricipantsEnhancer = () => {
  return store => next => action => {
    const stateHandle = stateHandler[action.type] ? stateHandler[action.type](store, action, patricipantsEnhancerState) : {};
    const returnHandle = returnHandler[action.type] ? returnHandler[action.type](store, action, patricipantsEnhancerState) : null;

    patricipantsEnhancerState = {
      ...patricipantsEnhancerState,
      ...stateHandle
    };

    console.log('patricipantsEnhancerState: ', action, { patricipantsEnhancerState, stateHandle, returnHandle });

    if (returnHandle) { return returnHandle; }
    next(action);

    const callbackHandle = callbackHandler[action.type];
    if (callbackHandle) { callbackHandle(store, action, patricipantsEnhancerState); }
  };
};

export default patricipantsEnhancer;
