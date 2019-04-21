import {combineReducers} from 'redux'
import counter from '../app/chiefTO/home/ducks';
import listTechnicians from '../app/chiefTO/technicians/ducks';

import userReducer from "../app/commonComponents/Reducer";
import loginPageReducer from "../app/commonComponents/LoginPage/Reducer";

export default combineReducers({
    user: userReducer,
    loginPage: loginPageReducer,
    counter,
    listTechnicians
})