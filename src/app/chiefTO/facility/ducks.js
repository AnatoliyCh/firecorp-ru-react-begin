import {ALL_FACILITY_PATH, IP_HOST, USER_DATA} from "../../commonComponents/Const";

export const GET_LIST_FACILITY = 'GET_LIST_FACILITY';
export const GET_SEARCH_LIST_FACILITY = 'GET_SEARCH_LIST_FACILITY';

const initialState = {
    list_facility: [],
    search_list_facility: []
};

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_FACILITY:
            return {
                ...state,
                list_facility: action.list_facility
            };
        case GET_SEARCH_LIST_FACILITY:
            return {
                ...state,
                search_list_facility: action.search_list_facility
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_facility = () => {
    return dispatch => fetch(`${IP_HOST}${ALL_FACILITY_PATH}`, {
        method: "GET",
        headers: {'SessionToken': USER_DATA.sessionToken}
    }).then(function (response) {
        if(response.status === 401) {
            document.location.href = "/";
        }
        return response.json()
    }).then(data => {
        dispatch({
            type: GET_LIST_FACILITY,
            list_facility: data
        });
        dispatch({
            type: GET_SEARCH_LIST_FACILITY,
            search_list_facility: data
        });
        console.log("Список объектов получен \n", data);
    }).catch(function (error) {
        console.log('Список объектов не получен \n', error.message);
    });
};

export const get_search_list_facility = (data) => {
    return dispatch => {
        dispatch({
            type: GET_SEARCH_LIST_FACILITY,
            search_list_facility: data
        });
    }
};