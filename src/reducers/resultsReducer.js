import * as ActionTypes from "../actions/actionTypes";

export default (state = null, action) => {
  if (action.type === ActionTypes.SET_RESULTS) {
    return action.results;
  }
  return state;
};
