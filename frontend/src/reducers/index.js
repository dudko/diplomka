import * as ActionTypes from '../actions';
const deepFreeze = require('deep-freeze');
import _ from 'lodash';

const initialState = {
  crystalSystem: 'unknown',
  elasticity: [0, 1, 2, 3, 4, 5].map(row =>
    [0, 1, 2, 3, 4, 5].map(cell =>
      ({ value: 0, disabled: false })
    )),
  points: {}
}

const reducer = (state = initialState, action) => {
  deepFreeze(state);
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
    case ActionTypes.PROCESS_POINTS: {
      const { points } = action.points;
      const updatedState = _.cloneDeep(state);
      updatedState.points = _.cloneDeep(action.points);
      return updatedState;
    }
    default:
      return state;
  }
};

export default reducer;
