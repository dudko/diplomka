import * as ActionTypes from '../constants/ActionTypes';

const worker = (state = {}, action) => {
  if (action.type === ActionTypes.PROCESS_WORKERS_MESSAGE) {
    return action.points;
  }
  return state;
}

export default worker;
