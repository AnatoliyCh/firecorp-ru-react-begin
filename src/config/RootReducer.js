import {combineReducers} from 'redux'
import counter from '../app/chiefTO/home/ducks';
import listTechnicians from '../app/chiefTO/technicians/ducks';
import listFacility from '../app/chiefTO/facility/ducks';
import listLocations from '../app/chiefTO/locations/ducks';

import userReducer from "../app/commonComponents/Reducer";
import loginPageReducer from "../app/commonComponents/LoginPage/Reducer";

export default combineReducers({
    user: userReducer,
    loginPage: loginPageReducer,
    counter,
    listTechnicians,
    listFacility,
    listLocations
})