import {ALL_MAINTENANCE_PATH, IP_HOST} from "../../commonComponents/Const";
import * as allConst from '../../commonComponents/Const';

export const GET_LIST_MAINTENANCE = 'GET_LIST_MAINTENANCE';

const initialState = {
    list_maintenance: [],
};

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_MAINTENANCE:
            return {
                ...state,
                list_maintenance: action.list_maintenance,
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_maintenance = () => {

    return dispatch => fetch(`${IP_HOST}${ALL_MAINTENANCE_PATH}`, {
        method: "GET",
        headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
    }).then(function (response) {
        if (response.status === 401) {
            document.location.href = "/";
        }
        return response.json()
    }).then(data => {

        dispatch({
            type: GET_LIST_MAINTENANCE,
            list_maintenance: data
        });

        console.log("Список заявок получен \n", data);
    }).catch(function (error) {
        console.log("Список заявок не получен\n", error.message);
    });
};