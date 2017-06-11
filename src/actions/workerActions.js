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
