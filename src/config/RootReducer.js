import { combineReducers } from 'redux'
import counter from '../app/chiefTO/home/ducks';
import userReducer from "../app/commonComponents/Reducer";

export default combineReducers({
  user: userReducer,
  counter
})