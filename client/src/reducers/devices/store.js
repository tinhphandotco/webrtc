import { DevicesTypes } from 'actions';

const INITIAL_STATE = {
  audioinput: null,
  audiooutput: null,
  videoinput: null,
};

export default function devices(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case DevicesTypes.SET_DEVICES:
      return {
        ...payload
      };

    default:
      return state;
  }
}
