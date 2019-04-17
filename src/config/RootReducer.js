import { combineReducers } from 'redux'
import counter from '../app/chiefTO/home/ducks';
import tokenReducer from "../app/commonComponents/Reducer";

export default combineReducers({
  token: tokenReducer,
  counter
})