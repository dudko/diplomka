import * as types from "./actionTypes";
import { handleAction } from "../worker"

export const rotateMatrix = (index, matrix, axes, angle) => handleAction({
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

export const calculate = materials => handleAction({
  type: types.CALCULATE,
  meta: {
    WebWorker: true
  },
  payload: {
    materials
  }
});
