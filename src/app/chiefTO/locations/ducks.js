import {
    ADD_LOCATION_PATH,
    ALL_LOCATIONS_PATH,
    DELETE_LOCATION_PATH,
    IP_HOST,
    LOCATION_UPDATE_PATH, TECHNICIANS_UPDATE_PATH
} from "../../commonComponents/Const";
import $ from 'jquery';
import * as allConst from "../../commonComponents/Const";

export const GET_LIST_LOCATIONS = 'GET_LIST_LOCATIONS';
export const GET_SEARCH_LIST_LOCATIONS = 'GET_SEARCH_LIST_LOCATIONS';
export const REVERSE_LIST_LOCATIONS = 'REVERSE_LIST_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATION2 = 'ADD_LOCATION2';
export const EDIT_LOCATION = 'EDIT_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';


const initialState = {
    list_locations: [],
    search_list_locations: [],
    sortUp_locations: true
};

/*Main compare function*/
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

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_LOCATIONS:
            return {
                ...state,
                list_locations: action.list_locations,
                sortUp_locations: true
            };
        case GET_SEARCH_LIST_LOCATIONS:
            return {
                ...state,
                search_list_locations: action.search_list_locations
            };
        case REVERSE_LIST_LOCATIONS:
            return {
                ...state,
                search_list_locations: state.search_list_locations.slice().reverse(),
                sortUp_locations: !state.sortUp_locations
            };
        case ADD_LOCATION:
            state.list_locations[state.list_locations.length] = action.new_location;
            return {
                ...state,
                list_locations: [...state.list_locations],
                search_list_locations: [...state.list_locations]
            };
        case ADD_LOCATION2:
            state.list_locations[state.list_locations.length - 1] = action.new_location;
            return {
                ...state,
                list_locations: [...state.list_locations],
                search_list_locations: [...state.list_locations]
            };
        case EDIT_LOCATION:
            state.list_locations[action.pos] = action.new_edit_location;
            return {
                ...state,
                list_locations: [...state.list_locations],
                search_list_locations: [...state.list_locations]
            };
        case DELETE_LOCATION:
            state.list_locations.splice(action.pos, 1);
            return {
                ...state,
                list_locations: [...state.list_locations],
                search_list_locations: [...state.list_locations]
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_locations = () => {
    return dispatch => {
        fetch(`${IP_HOST}${ALL_LOCATIONS_PATH}`, {
            method: "GET",
            headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            data = data.sort(compare);
            dispatch({
                type: GET_LIST_LOCATIONS,
                list_locations: data,
            });
            dispatch({
                type: GET_SEARCH_LIST_LOCATIONS,
                search_list_locations: data
            });
            console.log("Список локаций получен \n", data);
        }).catch(function (error) {
            console.log('Список локаций не получен \n', error.message);
        });
    }
};

export const add_location = (body, list_technicians, add_technicians) => {
    return dispatch => {
        fetch(`${IP_HOST}${ADD_LOCATION_PATH}`, {
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
                $('#interactLocation').modal('toggle');
            });
            body = Object.assign(JSON.parse(body), {oid: data});

            body["technicians"] = [];

            const kostyl = 1;
            add_technicians.map(technician => {
                let ind = list_technicians.findIndex(t => t.oid === technician.id);
                list_technicians[ind].zones = [...list_technicians[ind].zones, {oid: data}];

                fetch(`${IP_HOST}${TECHNICIANS_UPDATE_PATH}`, {
                    method: "POST",
                    headers: {'SessionToken': allConst.getCurrentUser().sessionToken},
                    body: JSON.stringify(list_technicians[ind])
                }).then(function (response) {
                    return response.json()
                }).then(d => {

                    body["technicians"] = [...body["technicians"], {
                        user: {
                            ref: {
                                lastName: technician.value.split(" ")[0],
                                firstName: technician.value.split(" ")[1][0],
                                middleName: technician.value.split(" ")[1][2]
                            }
                        }
                    }];
                    if(kostyl) {
                        dispatch({
                            type: ADD_LOCATION,
                            new_location: body
                        });
                    } else {
                        dispatch({
                            type: ADD_LOCATION2,
                            new_location: body
                        });
                    }

                    console.log("Прикреплен техник к локации \n", d);
                }).catch(function (e) {
                    console.log('Не прикреплен техник к локации \n', e.message);
                });
            });

            console.log("Локация добавлена \n", data);
        });

    }
};

export const edit_location = (body, pos) => {
    return dispatch => {
        fetch(`${IP_HOST}${LOCATION_UPDATE_PATH}`, {
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
                $('#interactLocation').modal('toggle');
            });

            dispatch({
                type: EDIT_LOCATION,
                new_edit_location: body,
                pos: pos
            });

            console.log("Локация изменена \n", data);
        }).catch(function (error) {
            console.log('Локация не изменена \n', error.message);
        });
    }
};

export const delete_location = (id, pos) => {
    return dispatch => {
        fetch(encodeURI(`${IP_HOST}${DELETE_LOCATION_PATH}&id=${id}`), {
            method: "POST",
            headers: {'SessionToken': allConst.getCurrentUser().sessionToken}
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {

            dispatch({
                type: DELETE_LOCATION,
                pos: pos
            });

            console.log("Локация удалена \n", data);
        }).catch(function (error) {
            console.log('Локация не удалена \n', error.message);
        });
    }
};

export const get_search_list_locations = (data) => {
    return dispatch => {
        dispatch({
            type: GET_SEARCH_LIST_LOCATIONS,
            search_list_locations: data
        });
    }
};

export const reverse_list_locations = () => {
    return dispatch => {
        dispatch({
            type: REVERSE_LIST_LOCATIONS
        });
    }
};