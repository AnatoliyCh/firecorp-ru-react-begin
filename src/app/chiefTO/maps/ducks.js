import {ALL_FACILITY_PATH, IP_HOST} from "../../commonComponents/Const";
import * as allConst from '../../commonComponents/Const';

export const GET_LIST_FACILITY_COORDINATES = 'GET_LIST_FACILITY_COORDINATES';


const initialState = {
    list_facility_coordinates: [],
};

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_FACILITY_COORDINATES:
            return {
                ...state,
                list_facility_coordinates: action.list_facility_coordinates,
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_facility_coordinates = () => {

    return dispatch => fetch(`${IP_HOST}${ALL_FACILITY_PATH}`, {
        method: "GET",
        headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
    }).then(function (response) {
        if (response.status === 401) {
            document.location.href = "/";
        }
        return response.json()
    }).then(data => {

        data = data.map(facility => [facility.name, ((facility.address || {}).location || {}).geox, ((facility.address || {}).location || {}).geoy]);
        dispatch({
            type: GET_LIST_FACILITY_COORDINATES,
            list_facility_coordinates: data
        });
        console.log("Список координат объектов получен \n", data);
    }).catch(function (error) {
        console.log('Список координат объектов не получен \n', error.message);
    });
};