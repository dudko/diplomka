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

export const rotateByAngle = (index, matrix, angle) => ({
  type: types.ROTATE_BY_ANGLE,
  meta: {
    WebWorker: true
  },
  payload: {
    index,
    matrix,
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
