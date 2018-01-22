import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import materials from './materialsReducer'
import results from './resultsReducer'

export default combineReducers({
  materials,
  results,
  routerReducer,
})
