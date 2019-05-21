import {PATH_USERS_ALL, IP_HOST, USER_DATA} from "../../commonComponents/Const";

export const GET_LIST_TECHNICIANS = 'GET_LIST_TECHNICIANS';
export const GET_SEARCH_LIST_TECHNICIANS = 'GET_SEARCH_LIST_TECHNICIANS';
export const REVERSE_LIST_TECHNICIANS = 'REVERSE_LIST_TECHNICIANS';

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
        default:
            return state
    }
}

/*actions*/
export const get_list_technicians = () => {
    return dispatch => fetch(`${IP_HOST}${PATH_USERS_ALL}`, {
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

        /*Получаем только техников по typeid = 4*/
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