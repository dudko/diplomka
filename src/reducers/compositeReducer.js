import * as types from "../actions/actionTypes";
import { List, Map } from "immutable";

import _ from "lodash";

const compositeReducer = (state = List([]), action) => {
  switch (action.type) {
    case types.ADD_MATERIAL: {
      const newMaterial = Map({
        matrix: action.matrix,
        matrixOriginal: action.matrix,
        axes: [0, 0, 1],
        angle: 0,
        fraction: 0
      });
      return state.push(newMaterial);
    }
    case types.REMOVE_MATRIX: {
      return state.delete(action.index);
    }
    case types.SET_ROTATED: {
      const material = state
        .get(action.index)
        .set("axes", action.axes)
        .set("matrix", action.matrix)
        .set("angle", action.angle)        
      return state.set(action.index, material);
    }
    case types.SET_FRACTION: {
      const material = state.get(action.index).set("fraction", action.fraction);
      return state.set(action.index, material);
    }
    case types.RESET_MATRIX: {
      let material = state.get(action.index);
      const matrixOriginal = material.get("matrixOriginal");
      material = material
        .set("matrix", matrixOriginal)
        .set("rotation", [0, 0, 1])
        .set("rotated", false);
      return state.set(action.index, material);
    }
    default: {
      return state;
    }
  }
};

export default compositeReducer;
