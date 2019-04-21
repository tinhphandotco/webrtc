import {
  makeActionsType
} from "utils/common";

const prefixType = "enhancer.participants.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const ENHANCER_SET_LOCAL_STREAM = prefixToastActions("ENHANCER_SET_LOCAL_STREAM");
export const ENHANCER_SET_REMOTE_STREAM = prefixToastActions("ENHANCER_SET_REMOTE_STREAM");
export const ENHANCER_GET_LOCAL_STREAM = prefixToastActions("ENHANCER_GET_LOCAL_STREAM");
export const ENHANCER_GET_REMOTE_PARTICIPANTS = prefixToastActions("ENHANCER_GET_REMOTE_PARTICIPANTS");
export const ENHANCER_GET_PARTICIPANTS_STREAM = prefixToastActions("ENHANCER_GET_PARTICIPANTS_STREAM");
export const ENHANCER_INITE_REMOTE_USER = prefixToastActions("ENHANCER_INITE_REMOTE_USER");
export const ENHANCER_GET_LOCAL_USER_INFO = prefixToastActions("ENHANCER_GET_LOCAL_USER_INFO");
export const ENHANCER_GET_LOCAL_PARTICIPANT_ID = prefixToastActions("ENHANCER_GET_LOCAL_PARTICIPANT_ID");
export const ENHANCER_GET_USER_INFOR_BY_ID = prefixToastActions("ENHANCER_GET_USER_INFOR_BY_ID");
export const ENHANCER_PARTICIPANT_DISCONECTING = prefixToastActions("ENHANCER_PARTICIPANT_DISCONECTING");
export const ENHANCER_GET_SELECTED_PARTICIPANT = prefixToastActions("ENHANCER_GET_SELECTED_PARTICIPANT");
export const ENHANCER_GET_SELECTED_PARTICIPANT_ID = prefixToastActions("ENHANCER_GET_SELECTED_PARTICIPANT_ID");
export const ENHANCER_SET_SELECT_PARTICIPANT = prefixToastActions("ENHANCER_SET_SELECT_PARTICIPANT");
export const ENHANCER_SET_STREAM = prefixToastActions("ENHANCER_SET_STREAM");
