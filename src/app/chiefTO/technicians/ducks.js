import {ALL_USERS_PATH, IP_HOST, USER_DATA} from "../../commonComponents/Const";

export const GET_LIST_TECHNICIANS = 'GET_LIST_TECHNICIANS';
export const GET_SEARCH_LIST_TECHNICIANS = 'GET_SEARCH_LIST_TECHNICIANS';
export const REVERSE_LIST_TECHNICIANS = 'REVERSE_LIST_TECHNICIANS';

const initialState = {
    list_technicians: [],
    search_list_technicians: []
};

/*reducers*/
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_TECHNICIANS:
            return {
                ...state,
                list_technicians: action.list_technicians
            };
        case GET_SEARCH_LIST_TECHNICIANS:
            return {
                ...state,
                search_list_technicians: action.search_list_technicians
            };
        case REVERSE_LIST_TECHNICIANS:
            return {
                ...state,
                search_list_technicians: state.search_list_technicians.slice().reverse()
            };
        default:
            return state
    }
}

/*actions*/
export const get_list_technicians = () => {
    return dispatch => fetch(`${IP_HOST}${ALL_USERS_PATH}`, {
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

        data = data.filter(user => user.typeId === 4).sort(compare);
        dispatch({
            type: GET_LIST_TECHNICIANS,
            list_technicians: data,
        });
        dispatch({
            type: GET_SEARCH_LIST_TECHNICIANS,
            search_list_technicians: data
        });
        console.log("Список пользователей получен \n", data);
    }).catch(function (error) {
        console.log('Список пользователей не получен \n', error.message);
    });
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