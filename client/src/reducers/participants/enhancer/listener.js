import { patricipantsEnhancerState } from './store';

const listener = {
  listHandler: [],
  prevHashUpdate: null,

  register(handler) {
    this.listHandler = [...this.listHandler, handler];
  },

  handler(store) {
    if (this.prevHashUpdate !== patricipantsEnhancerState.hashUpdate) {
      console.log('subscribe: ', this.prevHashUpdate, patricipantsEnhancerState.hashUpdate, this.listHandler)
      this.listHandler.forEach(handle => {
        handle(patricipantsEnhancerState)
      });
      this.prevHashUpdate = patricipantsEnhancerState.hashUpdate;
    }
  },

  subscribe(store) {
    store.subscribe(this.handler.bind(this, store));
  },
}

export default listener;