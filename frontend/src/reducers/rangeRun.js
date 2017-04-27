import * as ActionTypes from '../constants/ActionTypes';

const rangeRun = (state = {}, action) => {
  if (action.type === ActionTypes.PROCESS_RANGE_RUN_POINTS) {
    return action.points;
  }
  return state;
}

export default rangeRun;
