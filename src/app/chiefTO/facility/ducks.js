import {
    ADD_FACILITY_PATH,
    ALL_FACILITY_PATH,
    FACILITY_UPDATE_PATH,
    IP_HOST,
} from "../../commonComponents/Const";
import * as allConst from '../../commonComponents/Const';
import $ from "jquery";

export const GET_LIST_FACILITY = 'GET_LIST_FACILITY';
export const GET_SEARCH_LIST_FACILITY = 'GET_SEARCH_LIST_FACILITY';
export const REVERSE_LIST_FACILITY = 'REVERSE_LIST_FACILITY';
export const ADD_FACILITY = 'ADD_FACILITY';
export const EDIT_FACILITY = 'EDIT_FACILITY';

const initialState = {
    list_facility: [],
    search_list_facility: [],
    sortUp_facility: true
};

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_FACILITY:
            return {
                ...state,
                list_facility: action.list_facility,
                sortUp_facility: true
            };
        case GET_SEARCH_LIST_FACILITY:
            return {
                ...state,
                search_list_facility: action.search_list_facility
            };
        case REVERSE_LIST_FACILITY:
            return {
                ...state,
                search_list_facility: state.search_list_facility.slice().reverse(),
                sortUp_facility: !state.sortUp_facility
            };
        case ADD_FACILITY:
            return {
                ...state,
                list_facility: [...state.list_facility, action.new_facility],
                search_list_facility: [...state.search_list_facility, action.new_facility]
            };
        case EDIT_FACILITY:
            state.list_facility[action.pos] = action.new_edit_facility;
            state.search_list_facility[action.pos] = action.new_edit_facility;
            return {
                ...state,
                list_facility: [...state.list_facility],
                search_list_facility: [...state.search_list_facility]
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_facility = () => {

    return dispatch => fetch(`${IP_HOST}${ALL_FACILITY_PATH}`, {
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
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            }
            return comparison;
        }

        data = data.sort(compare);

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

export const add_facility = body => {
    return dispatch => {
        fetch(`${IP_HOST}${ADD_FACILITY_PATH}`, {
            method: "POST",
            headers: {'SessionToken': allConst.getCurrentUser().sessionToken},
            body: body
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            $(function () {
                $('#interactFacility').modal('toggle');
            });
            body = Object.assign(JSON.parse(body), {oid: data});
            console.log(body);
            dispatch({
                type: ADD_FACILITY,
                new_facility: body
            });

            console.log("Объект добавлен \n", data);
        }).catch(function (error) {
            console.log('Объект не добавлен \n', error.message);
        });
    }
};

export const edit_facility = (body, pos) => {
    return dispatch => {
        fetch(`${IP_HOST}${FACILITY_UPDATE_PATH}`, {
            method: "POST",
            headers: {'SessionToken': allConst.getCurrentUser().sessionToken},
            body: body
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            $(function () {
                $('#interactFacility').modal('toggle');
            });

            dispatch({
                type: EDIT_FACILITY,
                new_edit_facility: JSON.parse(body),
                pos: pos
            });

            console.log("Объект изменен \n", data);
        }).catch(function (error) {
            console.log('Объект не изменен \n', error.message);
        });
    }
};

export const get_search_list_facility = (data) => {
    return dispatch => {
        dispatch({
            type: GET_SEARCH_LIST_FACILITY,
            search_list_facility: data
        });
    }
};

export const reverse_list_facility = () => {
    return dispatch => {
        dispatch({
            type: REVERSE_LIST_FACILITY
        });
    }
};