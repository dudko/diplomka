import * as ActionTypes from "../actions/actionTypes";

const modalReducer = (state = null, action) => {
  if (action.type === ActionTypes.TOGGLE_MODAL) {
    return action.key;
  }
  return state;
};

export default modalReducer;
