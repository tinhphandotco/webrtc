import {
  makeActionsType
} from "utils/common";

const prefixType = "user.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const INIT_LOCAL_USER = prefixToastActions("INIT_LOCAL_USER");
export const SET_LOCAL_STREAM = prefixToastActions("SET_LOCAL_STREAM");
