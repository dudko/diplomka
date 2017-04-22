import * as ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';

const materialsProjectResult = (state = [], action) => {
  const { tensorsId, index, value } = action;
  const nextState = _.cloneDeep(state);
  nextState[index.row][index.column].value = value;

  return nextState;
}

const materialsProjectResults = (state = {}, action) => {
  // if (action.type === ActionTypes.TENSORS_FROM_SEARCH_RESULT) {
  //   return {
  //     ...state,
  //     [action.tensorsId]: materialsProjectResult(state[action.tensorsId], action)
  //   };
  // }

  return state;
}

export default materialsProjectResults;