import $ from 'jquery';
import * as allConst from "../../commonComponents/Const";
import {ALL_ORDER_PATH} from "../../commonComponents/Const";
import {IP_HOST} from "../../commonComponents/Const";

export const GET_LIST_ORDER = 'GET_LIST_ORDER';
export const GET_SEARCH_LIST_ORDER = 'GET_SEARCH_LIST_ORDER';

const initialState = {
    list_order: [],
    search_list_order: [],
    sortUp_order: true
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
        case GET_LIST_ORDER:
            return {
                ...state,
                list_order: action.list_order,
                sortUp_order: true
            };
        case GET_SEARCH_LIST_ORDER:
            return {
                ...state,
                search_list_order: action.search_list_order
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_order = () => {
    return dispatch => {
        fetch(`${IP_HOST}${ALL_ORDER_PATH}`, {
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
                type: GET_LIST_ORDER,
                list_order: data,
            });
            dispatch({
                type: GET_SEARCH_LIST_ORDER,
                search_list_order: data
            });
            console.log("Список регламентов получен \n", data);
        }).catch(function (error) {
            console.log('Список регламентов не получен \n', error.message);
        });
    }
};

export const get_search_list_order = (data) => {
    return dispatch => {
        dispatch({
            type: GET_SEARCH_LIST_ORDER,
            search_list_order: data
        });
    }
};