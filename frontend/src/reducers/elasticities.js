import * as ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';

const elasticity = (state = [], action) => {
  const { index, value } = action;
  const nextState = _.cloneDeep(state);
  nextState[index.row][index.column].value = value;

  return nextState;
}

const elasticities = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TENSOR: {
      return {
        ...state,
        [action.id]: elasticity(state[action.id], action)
      }
    }
    case ActionTypes.ELASTICITY_FROM_SEARCH: {
      return {
        ...state,
        [action.elasticityId]:
          action.elasticity.map(row =>
            row.map(value => ({ value, disabled: false })))
      }
    }
    default:
      return state
  };
}

export default elasticities;