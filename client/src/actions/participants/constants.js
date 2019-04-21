import {
  makeActionsType
} from "utils/common";

const prefixType = "participants.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const INIT_LOCAL_USER = prefixToastActions("INIT_LOCAL_USER");
export const SET_LOCAL_STREAM = prefixToastActions("SET_LOCAL_STREAM");
export const SET_REMOTE_STREAM = prefixToastActions("SET_REMOTE_STREAM");
export const GET_USER_MEDIA = prefixToastActions("GET_USER_MEDIA");
export const GET_ERROR_USER_MEDIA = prefixToastActions("GET_ERROR_USER_MEDIA");
export const INIT_REMOTE_USER = prefixToastActions("INIT_REMOTE_USER");
export const PARTICIPANT_DISCONNECTING = prefixToastActions("PARTICIPANT_DISCONNECTING");
export const SET_SELECT_PARTICIPANT = prefixToastActions("SET_SELECT_PARTICIPANT");
export const GET_SHARE_SCREEN = prefixToastActions("GET_SHARE_SCREEN");
export const CLOSE_SHARE_SCREEN = prefixToastActions("CLOSE_SHARE_SCREEN");
export const SET_STATE_SHARE_SCREEN = prefixToastActions("SET_STATE_SHARE_SCREEN");
export const SET_SETTING_DEVICES = prefixToastActions("SET_SETTING_DEVICES");
export const SOCKET_MSG = prefixToastActions("SOCKET_MSG");
export const IS_SHARING_SCREEN = prefixToastActions("IS_SHARING_SCREEN");
export const SET_LOCAL_SETTING_DEVICES = prefixToastActions("SET_LOCAL_SETTING_DEVICES");
