import * as types from '../constants/ActionTypes'
const api = require('../api');

export const cellChanged = (id, value, index) => ({
  type: types.CHANGE_TENSOR,
  id,
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

export const tensorsToSearchResult = (tensorsId, elasticity, crystalSystem) => ({
  type: types.TENSORS_FROM_SEARCH_RESULT,
  tensorsId,
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

export const processRangeRunPoints = (points) => ({
  type: types.PROCESS_RANGE_RUN_POINTS,
  points: points
});

export const submitPhase = (elasticity, worker) => (dispatch) => {
  worker.postMessage(elasticity);
  worker.onmessage = msg => dispatch(processPoints(msg.data));
  api.elateAnalyse((tables) => {dispatch(processTables(tables))}, elasticity);
}

export const submitComposite = (elasticity, worker) => (dispatch) => {
  worker.postMessage(elasticity);
  worker.onmessage = msg => {
    dispatch(processPoints(msg.data));
    dispatch(processRangeRunPoints(msg.data.rangeRun));
    api.elateAnalyse((tables) => {dispatch(processTables(tables))}, msg.data.compositeElasticity)
  };
}

 


