import {
  // RoomTypes,
  ParticipantsActions,
  ParticipantsEnhancerActions
} from 'actions';

export const connect = (store, socketId) => {
  store.dispatch(ParticipantsActions.initLocalUser({ id: socketId }));
};

export const getUserMedia = (store, socketId, constrains) => {
  navigator.mediaDevices.getUserMedia(constrains)
    .then((stream) => {
      store.dispatch(ParticipantsEnhancerActions.enhancerSetLocalStream(socketId, stream));
    });
};