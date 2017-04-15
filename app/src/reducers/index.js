import * as ActionTypes from '../actions';

const initialState = {
  type: 'unknown',
  constants:
    [0, 1, 2, 3, 4, 5].map(row =>
      [0, 1, 2, 3, 4, 5].map(cell =>
        ({ value: null, disabled: false })
    ))
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.CONSTANT_CHANGED: {
      const { index, value } = action;
      const updatedState = state.constants.map(row => [...row]);
      updatedState[index.row][index.cell] = value 
    }
    default:
      return state;
  }
}

export default reducer;
