import * as RoomActions from './room/actions';
import * as RoomTypes from './room/constants';

import * as ParticipantsActions from './participants/actions';
import * as ParticipantsTypes from './participants/constants';

import * as ParticipantsEnhancerActions from './participants/enhancer/actions';
import * as ParticipantsEnhancerTypes from './participants/enhancer/constants';

import * as UIStateActions from './uiState/actions';
import * as UIStateTypes from './uiState/constants';

import * as DevicesActions from './devices/actions';
import * as DevicesTypes from './devices/constants';

import * as ChatActions from './chat/actions';
import * as ChatTypes from './chat/constants';

export default {
  RoomActions,
  RoomTypes,
  ParticipantsActions,
  ParticipantsTypes,
  ParticipantsEnhancerActions,
  ParticipantsEnhancerTypes,
  UIStateActions,
  UIStateTypes,
  DevicesActions,
  DevicesTypes,
  ChatActions,
  ChatTypes
};

export {
  RoomActions,
  RoomTypes,
  ParticipantsActions,
  ParticipantsTypes,
  ParticipantsEnhancerActions,
  ParticipantsEnhancerTypes,
  UIStateActions,
  UIStateTypes,
  DevicesActions,
  DevicesTypes,
  ChatActions,
  ChatTypes
};
