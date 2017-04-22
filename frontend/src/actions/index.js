import * as types from '../constants/ActionTypes'
const api = require('../api');

export const cellChanged = (value, index) => ({
  type: types.CELL_CHANGED,
  value,
  index
});

export const crystalSystemChanged = (crystalSystem) => ({
  type: types.CRYSTAL_SYSTEM_CHANGED,
  crystalSystem
});

export const materialKeywordChanged = (keyword) => ({
  type: types.MATERIAL_KEYWORD_CHANGED,
  keyword
});

export const updateToSearchResult = (elasticity, crystalSystem) => ({
  type: types.UPDATE_TO_SEARCH_RESULT,
  elasticity,
  crystalSystem
});

export const processTables = (tables) => ({
  type: types.PROCESS_TABLES,
  tables  
});

export const processPoints = (points) => ({
  type: types.PROCESS_POINTS,
  points
});

export const submitPhase = (elasticity, worker) => (dispatch) => {
  worker.postMessage(elasticity);
  worker.onmessage = msg => dispatch(processPoints(msg.data));
  api.elateAnalyse((tables) => {dispatch(processTables(tables))}, elasticity);
}

 


