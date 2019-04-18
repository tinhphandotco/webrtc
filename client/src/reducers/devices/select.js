import compose from  'ramda/src/compose';

export const getDevicesState = state => state.devices;

export const getDevices = compose(
  devicesState => ({
    audioinput: devicesState.audioinput,
    audiooutput: devicesState.audiooutput,
    videoinput: devicesState.videoinput
  }),
  getDevicesState
);

export const getSinkId = compose(
  devicesState => devicesState.audiooutput,
  getDevicesState
);