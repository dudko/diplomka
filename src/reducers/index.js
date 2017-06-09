import { combineReducers } from "redux";

import materials from "./materialsReducer";
import modal from "./modalReducer";

export default combineReducers({
  materials,
  modal
});
