import {ALL_SHIFTS_PATH, getFIO, IP_HOST} from "../../commonComponents/Const";
import * as allConst from '../../commonComponents/Const';

export const GET_LIST_FACILITY_COORDINATES = 'GET_LIST_FACILITY_COORDINATES';
export const GET_LIST_TECHNICIANS_COORDINATES = 'GET_LIST_TECHNICIANS_COORDINATES';

const initialState = {
    list_facility_coordinates: [],
    list_technicians_coordinates: []
};

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_FACILITY_COORDINATES:
            return {
                ...state,
                list_facility_coordinates: action.list_facility_coordinates,
            };
        case GET_LIST_TECHNICIANS_COORDINATES:
            return {
                ...state,
                list_technicians_coordinates: action.list_technicians_coordinates,
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_facility_coordinates = () => {

    return dispatch => fetch(`${IP_HOST}${ALL_SHIFTS_PATH}`, {
        method: "GET",
        headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
    }).then(function (response) {
        if (response.status === 401) {
            document.location.href = "/";
        }
        return response.json()
    }).then(data => {

        let dataTechnicians = data.map(technician => [getFIO((((technician.technician || {}).ref || {}).user || {}).ref), (((technician.points[technician.points.length - 1] || {}).ref || {}).gps || {}).geox, (((technician.points[technician.points.length - 1] || {}).ref || {}).gps || {}).geoy]);
        let dataFacility = data.map(shift => shift.visits.map(facility => ((facility.ref || {}).facility || {}).ref));
        dataFacility = dataFacility.map(shift => shift.map(facility => [facility.name, ((facility.address || {}).location || {}).geox, ((facility.address || {}).location || {}).geoy]));

        dispatch({
            type: GET_LIST_FACILITY_COORDINATES,
            list_facility_coordinates: dataFacility
        });
        dispatch({
            type: GET_LIST_TECHNICIANS_COORDINATES,
            list_technicians_coordinates: dataTechnicians
        });
        console.log("Список координат объектов получен \n", dataFacility, "\n", "Список координат техников получен\n", dataTechnicians);
    }).catch(function (error) {
        console.log('Список координат объектов не получен \n Список координат техников не получен', error.message);
    });
};