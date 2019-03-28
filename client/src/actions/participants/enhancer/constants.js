import {
  makeActionsType
} from "utils/common";

const prefixType = "enhancer.participants.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const ENHANCER_SET_LOCAL_STREAM = prefixToastActions("ENHANCER_SET_LOCAL_STREAM");
export const ENHANCER_GET_LOCAL_STREAM = prefixToastActions("ENHANCER_GET_LOCAL_STREAM");
export const ENHANCER_GET_PARTICIPANTS_STREAM = prefixToastActions("ENHANCER_GET_PARTICIPANTS_STREAM");
export const ENHANCER_INITE_REMOTE_USER = prefixToastActions("ENHANCER_INITE_REMOTE_USER");
