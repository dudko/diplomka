import * as ActionTypes from "../actions/actionTypes";

const modalReducer = (state = null, action) => {
  if (action.type === ActionTypes.SET_RESULTS) {
    return action.results;
  }
  return state;
};

export default modalReducer;
