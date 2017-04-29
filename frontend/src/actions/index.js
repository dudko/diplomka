import * as types from '../constants/ActionTypes'
const api = require('../api');

export const updateConst = (id, index, value) => ({
  type: types.CHANGE_TENSOR,
  id,
  index,
  value
});

export const crystalSystemChanged = (crystalSystem) => ({
  type: types.CRYSTAL_SYSTEM_CHANGED,
  crystalSystem
});

export const materialKeywordChanged = (keyword) => ({
  type: types.MATERIAL_KEYWORD_CHANGED,
  keyword
});

export const replaceElasticityWithFound = (elasticityId, elasticity, crystalSystem) => ({
  type: types.ELASTICITY_FROM_SEARCH,
  elasticityId,
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

export const submitComposite = (dataToSend, worker) => (dispatch) => {
  worker.postMessage(dataToSend);
  worker.onmessage = msg => {
    dispatch(processPoints(msg.data));
    dispatch(processRangeRunPoints(msg.data.rangeRun));
    api.elateAnalyse((tables) => {dispatch(processTables(tables))}, msg.data.compositeElasticity)
  };
}

 


