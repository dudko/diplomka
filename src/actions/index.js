import * as actionTypes from "./actionTypes";

export const addToComposite = matrix => ({
  type: actionTypes.ADD_MATERIAL,
  matrix
});

export const updateCompared = results => ({
  type: actionTypes.UPDATE_COMPARED,
  results
});

export const removeAdded = index => ({
  type: actionTypes.REMOVE_MATERIAL,
  index
});

export const setRotation = (index, rotation) => ({
  type: actionTypes.SET_ROTATION,
  index,
  rotation
});

export const setMatrix = (index, matrix) => ({
  type: actionTypes.SET_MATRIX,
  index,
  matrix
});
