import { combineReducers } from "redux";

import materials from "./compositeReducer";
import modal from "./modalReducer";

export default combineReducers({
  materials,
  modal
});
