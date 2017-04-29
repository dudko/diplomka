import { combineReducers } from 'redux';
import points from './points';
import elasticities from './elasticities';
import rangeRun from './rangeRun';
import worker from './worker';

// const deepFreeze = require('deep-freeze');
import _ from 'lodash';

const reducer = combineReducers({
  elasticities,
  points,
  rangeRun,
  worker,
});

export default reducer;
