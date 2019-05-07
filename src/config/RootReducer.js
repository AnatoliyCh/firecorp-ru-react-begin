import {combineReducers} from 'redux'
import commonReducer from "../app/commonComponents/Reducer";

import counter from '../app/chiefTO/home/ducks';
import listTechnicians from '../app/chiefTO/technicians/ducks';
import listFacility from '../app/chiefTO/facility/ducks';
import listLocations from '../app/chiefTO/locations/ducks';
import loginPageReducer from '../app/commonComponents/LoginPage/Reducer';
import administratorReducer from '../app/Administrator/Reducer';


export default combineReducers({
    commonReducer,
    loginPage: loginPageReducer,
    administratorReducer,
    counter,
    listTechnicians,
    listFacility,
    listLocations
})