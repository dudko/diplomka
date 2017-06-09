import * as actionTypes from "./actionTypes";

export const toggleModal = key => ({
  type: actionTypes.TOGGLE_MODAL,
  key
});
