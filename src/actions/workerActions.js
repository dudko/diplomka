import * as types from "./actionTypes";

export const rotateMatrix = (index, matrix, axes, angle) => ({
  type: types.ROTATE_MATRIX,
  meta: {
    WebWorker: true
  },
  payload: {
    index,
    matrix,
    axes,
    angle
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
