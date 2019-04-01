import io from 'socket.io-client';
import { SOCKET_URL } from 'config';
import { ParticipantsActions } from 'actions';

const roomMiddleware = store => {
  const socket = io(SOCKET_URL);

  socket.on('connect', () => {
    store.dispatch(ParticipantsActions.initLocalUser({ id: socket.id }));
  });

  return next => action => next(action);
};

export default roomMiddleware;