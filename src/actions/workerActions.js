import * as types from "./actionTypes";

export const rotateMatrix = (index, matrix, rotation) => ({
  type: types.ROTATE_MATRIX,
  meta: {
    WebWorker: true
  },
  payload: {
    index,
    matrix,
    rotation
  }
});

export const calculate = materials => ({
  type: types.CALCULATE,
  meta: {
    WebWorker: true
  },
  payload: {
    materials
  }
});
