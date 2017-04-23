import * as ActionTypes from '../constants/ActionTypes';

const points = (state = {}, action) => {
  if (action.type === ActionTypes.PROCESS_POINTS) {
    return action.points;
  }
  return state;
}

export default points;
