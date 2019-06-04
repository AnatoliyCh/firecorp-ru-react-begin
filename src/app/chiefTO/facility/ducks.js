import {
    ADD_FACILITY_PATH, ALL_CONTRACTOR_PATH,
    ALL_FACILITY_PATH, DELETE_FACILITY_PATH,
    FACILITY_UPDATE_PATH,
    IP_HOST,
    ADD_TECHNICIAN_TO_FACILITY_PATH,
} from "../../commonComponents/Const";
import * as allConst from '../../commonComponents/Const';
import $ from "jquery";

export const GET_LIST_FACILITY = 'GET_LIST_FACILITY';
export const GET_SEARCH_LIST_FACILITY = 'GET_SEARCH_LIST_FACILITY';
export const REVERSE_LIST_FACILITY = 'REVERSE_LIST_FACILITY';
export const ADD_FACILITY = 'ADD_FACILITY';
export const EDIT_FACILITY = 'EDIT_FACILITY';
export const DELETE_FACILITY = 'DELETE_FACILITY';
export const GET_LIST_CONTRACTOR = 'GET_LIST_CONTRACTOR';
export const ADD_TECHNICIAN_TO_FACILITY = 'ADD_TECHNICIAN_TO_FACILITY';

const initialState = {
    list_facility: [],
    search_list_facility: [],
    sortUp_facility: true,
    list_contractor: []
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
            return {
                ...state,
                list_facility: [...state.list_facility],
                search_list_facility: [...state.list_facility]
            };
        case DELETE_FACILITY:
            state.list_facility.splice(action.pos, 1);
            return {
                ...state,
                list_facility: [...state.list_facility],
                search_list_facility: [...state.list_facility]
            };
        case GET_LIST_CONTRACTOR:
            return {
                ...state,
                list_contractor: action.list_contractor
            };
        case ADD_TECHNICIAN_TO_FACILITY:
            return {
                ...state,
                list_contractor: action.list_contractor
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

export const add_facility = (body, pos, technicianid) => {
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

            fetch(`${IP_HOST}${ADD_TECHNICIAN_TO_FACILITY_PATH}?id=${data}&technicianid=${technicianid}&datems=0`, {
                method: "POST",
                headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
            }).then(function (response) {
                if (response.status === 401) {
                    document.location.href = "/";
                }
                return response.json()
            }).then(data => {


                dispatch({
                    type: ADD_FACILITY,
                    new_facility: body
                });

                console.log("Объекту назначен техник \n", data);
            }).catch(function (error) {
                console.log('Объекту не назначен техник \n', error.message);
            });

            console.log("Объект добавлен \n", data);
        }).catch(function (error) {
            console.log('Объект не добавлен \n', error.message);
        });
    }
};

export const edit_facility = (body, pos, technicianid) => {
    return dispatch => {
        fetch(`${IP_HOST}${FACILITY_UPDATE_PATH}`, {
            method: "POST",
            headers: {'SessionToken': allConst.getCurrentUser().sessionToken},
            body: JSON.stringify(body)
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            $(function () {
                $('#interactFacility').modal('toggle');
            });

            fetch(`${IP_HOST}${ADD_TECHNICIAN_TO_FACILITY_PATH}?id=${data}&technicianid=${technicianid}&datems=0`, {
                method: "POST",
                headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
            }).then(function (response) {
                if (response.status === 401) {
                    document.location.href = "/";
                }
                return response.json()
            }).then(data => {


                dispatch({
                    type: EDIT_FACILITY,
                    new_edit_facility: body,
                    pos: pos
                });

                console.log("Объекту назначен техник \n", data);
            }).catch(function (error) {
                console.log('Объекту не назначен техник \n', error.message);
            });

            console.log("Объект изменен \n", data);
        }).catch(function (error) {
            console.log('Объект не изменен \n', error.message);
        });
    }
};
export const delete_facility = (id, pos) => {
    return dispatch => {
        fetch(encodeURI(`${IP_HOST}${DELETE_FACILITY_PATH}&id=${id}`), {
            method: "POST",
            headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {

            dispatch({
                type: DELETE_FACILITY,
                pos: pos
            });

            console.log("Локация удалена \n", data);
        }).catch(function (error) {
            console.log('Локация не удалена \n', error.message);
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

export const get_list_contractor = () => {

    return dispatch => fetch(`${IP_HOST}${ALL_CONTRACTOR_PATH}`, {
        method: "GET",
        headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
    }).then(function (response) {
        if (response.status === 401) {
            document.location.href = "/";
        }
        return response.json()
    }).then(data => {

        dispatch({
            type: GET_LIST_CONTRACTOR,
            list_contractor: data
        });

        console.log("Список контрагентов получен \n", data);
    }).catch(function (error) {
        console.log('Список контрагентов не получен \n', error.message);
    });
};

export const add_technician_to_facility = (id, technicianid) => {
    fetch(`${IP_HOST}${ADD_TECHNICIAN_TO_FACILITY_PATH}?id=${id}&technicianid=${technicianid}&datems=0`, {
        method: "POST",
        headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
    }).then(function (response) {
        if (response.status === 401) {
            document.location.href = "/";
        }
        return response.json()
    }).then(data => {

        /*dispatch({
            type: GET_LIST_CONTRACTOR,
            list_contractor: data
        });*/

        console.log("Объекту назначен техник \n", data);
    }).catch(function (error) {
        console.log('Объекту не назначен техник \n', error.message);
    });
};