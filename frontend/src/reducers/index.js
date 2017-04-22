import { combineReducers } from 'redux';
import points from './points';
import * as ActionTypes from '../actions';
const deepFreeze = require('deep-freeze');
import _ from 'lodash';

let reducer = (state = {}, action) => {
  // deepFreeze(state);
  switch(action.type) {
    case ActionTypes.CELL_CHANGED: {
      const { value, index } = action;
      const updatedState = _.cloneDeep(state);
      updatedState.elasticity[index.row][index.column].value = value;
      return updatedState;
    }
    case ActionTypes.UPDATE_TO_SEARCH_RESULT: {
      const { elasticity, crystalSystem } = action;
      const updatedState = _.cloneDeep(state);
      updatedState.elasticity = updatedState.elasticity.map((row, rowIndex) =>
        row.map((cell, cellIndex) => Object.assign(cell, { value: elasticity[rowIndex][cellIndex] })));
      updatedState.crystalSystem = crystalSystem;
      return updatedState;
    }
    case ActionTypes.PROCESS_TABLES: {
      const { tables } = action.tables;
      const updatedState = _.cloneDeep(state);
      updatedState.tables = _.cloneDeep(action.tables);
      return updatedState;
    }

    default:
      return state;
  }
};

reducer = combineReducers({
  reducer,
  points
});

export default reducer;
