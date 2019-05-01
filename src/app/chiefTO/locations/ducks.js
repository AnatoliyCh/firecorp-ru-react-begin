import {ALL_LOCATIONS_PATH, IP_HOST, USER_DATA} from "../../commonComponents/Const";

export const GET_LIST_LOCATIONS = 'GET_LIST_LOCATIONS';
export const GET_SEARCH_LIST_LOCATIONS = 'GET_SEARCH_LIST_LOCATIONS';
export const REVERSE_LIST_LOCATIONS = 'REVERSE_LIST_LOCATIONS';

const initialState = {
    list_locations: [],
    search_list_locations: [],
    sortUp_locations: true
};

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
        default:
            return state
    }
}

/*actions*/
export const get_list_locations = () => {
    return dispatch => {
        fetch(`${IP_HOST}${ALL_LOCATIONS_PATH}`, {
            method: "GET",
            headers: {'SessionToken': USER_DATA.sessionToken}
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