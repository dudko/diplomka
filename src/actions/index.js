import * as types from "./actionTypes";

export const addToComposite = matrix => ({
  type: types.ADD_MATERIAL,
  matrix
});

export const removeMatrix = index => ({
  type: types.REMOVE_MATRIX,
  index
});

export const setRotated = (index, matrix, rotation) => ({
  type: types.SET_ROTATED,
  index,
  matrix,
  rotation
});

export const resetMatrix = index => ({
  type: types.RESET_MATRIX,
  index
});
