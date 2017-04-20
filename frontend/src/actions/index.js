const api = require('../api');

export const CELL_CHANGED = 'CELL_CHANGED';
export const CRYSTAL_SYSTEM_CHANGED = 'CRYSTAL_SYSTEM';
export const MATERIAL_KEYWORD_CHANGED = 'MATERIAL_KEYWORD_CHANGED';
export const UPDATE_TO_SEARCH_RESULT = 'UPDATE_TO_SEARCH_RESULT';
export const SUBMIT_PHASE = 'SUBMIT_PHASE';
export const PROCESS_POINTS = 'PROCESS_POINTS';
export const PROCESS_TABLES = 'PROCESS_TABLES';

export const cellChanged = (value, index) => ({
  type: CELL_CHANGED,
  value,
  index
});

export const crystalSystemChanged = (crystalSystem) => ({
  type: CRYSTAL_SYSTEM_CHANGED,
  crystalSystem
});

export const materialKeywordChanged = (keyword) => ({
  type: MATERIAL_KEYWORD_CHANGED,
  keyword
});

export const updateToSearchResult = (elasticity, crystalSystem) => ({
  type: UPDATE_TO_SEARCH_RESULT,
  elasticity,
  crystalSystem
});

export const processTables = (tables) => ({
  type: PROCESS_TABLES,
  tables  
});

export const processPoints = (points) => ({
  type: PROCESS_POINTS,
  points
});

export const submitPhase = (elasticity, worker) => (dispatch) => {
  worker.postMessage(elasticity);
  worker.onmessage = msg => dispatch(processPoints(msg.data));
  api.elateAnalyse((tables) => {dispatch(processTables(tables))}, elasticity);
}

 


