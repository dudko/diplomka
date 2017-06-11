import { combineReducers } from "redux";

import materials from "./compositeReducer";
import modal from "./modalReducer";
import results from "./resultsReducer";

export default combineReducers({
  materials,
  modal,
  results
});
