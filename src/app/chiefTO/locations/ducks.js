import {ADD_LOCATION_PATH, ALL_LOCATIONS_PATH, IP_HOST} from "../../commonComponents/Const";
import $ from 'jquery';
import * as allConst from "../../commonComponents/Const";
export const GET_LIST_LOCATIONS = 'GET_LIST_LOCATIONS';
export const GET_SEARCH_LIST_LOCATIONS = 'GET_SEARCH_LIST_LOCATIONS';
export const REVERSE_LIST_LOCATIONS = 'REVERSE_LIST_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';

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
            return {
                ...state,
                list_locations: [...state.list_locations, action.new_location],
                search_list_locations: [...state.search_list_locations, action.new_location]
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

export const add_location = body => {
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
                $('#addLocation').modal('toggle');
            });

            dispatch({
                type: ADD_LOCATION,
                new_location: JSON.parse(body)
            });

            console.log("Локация добавлена \n", data);
        }).catch(function (error) {
            console.log('Локация не добавлена \n', error.message);
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