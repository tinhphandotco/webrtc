import { booleanToPromise } from 'utils/common';
import compose from 'ramda/src/compose';

export const hasRoom = (store) => !!store.room.roomName;
export const hasRoomMiddleware = compose(booleanToPromise, hasRoom);