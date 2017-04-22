import * as ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
const deepFreeze = require('deep-freeze');

const inputForTensor = (state = [], action) => {
  if (action.type === ActionTypes.CHANGE_TENSOR) {
    const { index, value } = action;
    const nextState = _.cloneDeep(state);
    nextState[index.row][index.column].value = value;

    return nextState;
  }
  return state;
}

const inputForTensors = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TENSOR: {
      return {
        ...state,
        [action.id]: inputForTensor(state[action.id], action)
      }
    }
    case ActionTypes.TENSORS_FROM_SEARCH_RESULT: {
      return {
        ...state,
        [action.tensorsId]: action.elasticity.map(row =>
          row.map(value => ({ value, disabled: false })))
      }
    }
    default:
      return state
  };
}

export default inputForTensors;