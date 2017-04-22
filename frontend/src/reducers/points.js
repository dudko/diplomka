import * as ActionTypes from '../actions';

const points = (state = {}, action) => {
  if (action.type === ActionTypes.PROCESS_POINTS) {
    return action.points;
  }
  return state;
}

export default points;
