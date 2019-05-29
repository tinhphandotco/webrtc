const listener = {
  listHandler: [],
  prevHashUpdate: null,

  register(handler) {
    this.listHandler = [...this.listHandler, handler];
  },

  handler(store) {},

  subscribe(store) {
    store.subscribe(this.handler.bind(this, store));
  },
};

export default listener;