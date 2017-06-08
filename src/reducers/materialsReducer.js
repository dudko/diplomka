import * as ActionTypes from "../actions/actionTypes";
import { List } from "immutable";

const materialsReducer = (state = List([]), action) => {
  switch (action.type) {
    case ActionTypes.ADD_MATERIAL: {
      const newMaterial = {
        matrix: action.matrix,
        rotation: [0, 0, 0],
        fraction: 0
      };
      return state.push(newMaterial);
    }
    case ActionTypes.REMOVE_MATERIAL: {
      return state.delete(action.index);
    }
    case ActionTypes.SET_ROTATION: {
      const material = state.get(action.index);
      material.rotation = action.rotation;
      return state.set(action.index, material);
    }

    default: {
      return state;
    }
  }
};

export default materialsReducer;
