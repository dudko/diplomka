import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import materials from "./compositeReducer";
import results from "./resultsReducer";

export default combineReducers({
  materials,
  results,
  routerReducer
});
