import { combineReducers } from 'redux';
import points from './points';
import inputForTensors from './inputForTensors';
import materialsProjectResults from './materialsProjectResults';
import rangeRun from './rangeRun';
import worker from './worker';

// const deepFreeze = require('deep-freeze');
import _ from 'lodash';

const reducer = combineReducers({
  points,
  inputForTensors,
  materialsProjectResults,
  rangeRun,
  worker,
});

export default reducer;
