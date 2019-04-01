import { _store } from "index";

const Error401 = () => {
  _store.getState().routing.history.push('/login');
};

export {
  Error401
};