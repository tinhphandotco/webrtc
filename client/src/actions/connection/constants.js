import {
  makeActionsType
} from "utils/common";

const prefixType = "connection.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const ENHANCER_SET_LOCAL_STREAM = prefixToastActions("ENHANCER_SET_LOCAL_STREAM")
export const ENHANCER_GET_LOCAL_STREAM = prefixToastActions("ENHANCER_GET_LOCAL_STREAM");
