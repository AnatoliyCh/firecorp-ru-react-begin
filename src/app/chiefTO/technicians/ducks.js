import {
    PATH_USERS_ALL,
    IP_HOST,
    ALL_TECHNICIANS_PATH,
    LOCATION_UPDATE_PATH,
    TECHNICIANS_UPDATE_PATH
} from "../../commonComponents/Const";
import * as allConst from "../../commonComponents/Const";
import $ from "jquery";
import {EDIT_LOCATION} from "../locations/ducks";

export const GET_LIST_TECHNICIANS = 'GET_LIST_TECHNICIANS';
export const GET_SEARCH_LIST_TECHNICIANS = 'GET_SEARCH_LIST_TECHNICIANS';
export const REVERSE_LIST_TECHNICIANS = 'REVERSE_LIST_TECHNICIANS';
export const EDIT_TECHNICIAN = 'EDIT_TECHNICIAN';

const initialState = {
    list_technicians: [],
    search_list_technicians: [],
    sortUp_technicians: true
};

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_TECHNICIANS:
            return {
                ...state,
                list_technicians: action.list_technicians,
                sortUp_technicians: true
            };
        case GET_SEARCH_LIST_TECHNICIANS:
            return {
                ...state,
                search_list_technicians: action.search_list_technicians
            };
        case REVERSE_LIST_TECHNICIANS:
            return {
                ...state,
                search_list_technicians: state.search_list_technicians.slice().reverse(),
                sortUp_technicians: !state.sortUp_technicians
            };
        case EDIT_TECHNICIAN:
            state.list_technicians[action.pos] = action.new_edit_technician;
            return {
                ...state,
                list_technicians: [...state.list_technicians],
                search_list_technicians: [...state.list_technicians]
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_technicians = () => {
    return dispatch => fetch(`${IP_HOST}${ALL_TECHNICIANS_PATH}`, {
        method: "GET",
        headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
    }).then(function (response) {
        if (response.status === 401) {
            document.location.href = "/";
        }
        return response.json()
    }).then(data => {
        function compare(a, b) {
            // Используем toUpperCase() для преобразования регистра
            const nameA = a.lastName.toUpperCase();
            const nameB = b.lastName.toUpperCase();

            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            }
            return comparison;
        }

        dispatch({
            type: GET_LIST_TECHNICIANS,
            list_technicians: data,
        });
        dispatch({
            type: GET_SEARCH_LIST_TECHNICIANS,
            search_list_technicians: data
        });
        console.log("Список техников получен \n", data);
    }).catch(function (error) {
        console.log('Список техников не получен \n', error.message);
    });
};

export const edit_technician = (pos, technician) => {
    return dispatch => {
        fetch(`${IP_HOST}${TECHNICIANS_UPDATE_PATH}`, {
            method: "POST",
            headers: {'SessionToken': allConst.getCurrentUser().sessionToken},
            body: JSON.stringify(technician)
        }).then(function (response) {
            return response.json()
        }).then(d => {
            $(function () {
                $('#editTechnician').modal('toggle');
            });

            dispatch({
                type: EDIT_TECHNICIAN,
                new_edit_technician: technician,
                pos: pos
            });

            console.log("Прикреплен техник к локации \n", d);
        }).catch(function (e) {
            console.log('Не прикреплен техник к локации \n', e.message);
        });
    }
};

export const get_search_list_technicians = (data) => {
    return dispatch => {
        dispatch({
            type: GET_SEARCH_LIST_TECHNICIANS,
            search_list_technicians: data
        });
    }
};

export const reverse_list_technicians = () => {
    return dispatch => {
        dispatch({
            type: REVERSE_LIST_TECHNICIANS
        });
    }
};