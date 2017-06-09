import * as ActionTypes from "./actionTypes";

export const rotateMatrix = (key, matrix, rotation) => ({
  type: ActionTypes.ROTATE_MATRIX,
  meta: {
    WebWorker: true
  },
  payload: {
    key,
    matrix,
    rotation
  }
});
