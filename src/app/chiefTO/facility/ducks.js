import {ALL_FACILITY_PATH, ALL_USERS_PATH, IP_HOST, USER_DATA} from "../../commonComponents/Const";

export const GET_LIST_FACILITY = 'GET_LIST_FACILITY';
export const GET_SEARCH_LIST_FACILITY = 'GET_SEARCH_LIST_FACILITY';
export const REVERSE_LIST_FACILITY = 'REVERSE_LIST_FACILITY';
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
        default:
            return state
    }
}

/*actions*/
export const get_list_facility = () => {
    return dispatch =>
        fetch(`${IP_HOST}${ALL_FACILITY_PATH}`, {
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

            fetch(`${IP_HOST}${ALL_USERS_PATH}`, {
                method: "GET",
                headers: {'SessionToken': USER_DATA.sessionToken}
            }).then(function (response) {
                if (response.status === 401) {
                    document.location.href = "/";
                }
                return response.json()
            }).then(dataTechnicians => {
                /*Получаем только техников по typeid = 4*/
                dataTechnicians = dataTechnicians.filter(user => user.typeId === 4);

                data = data.forEach(facility => {
                    let findTechnician = dataTechnicians.find(tech => tech.secondTableId === (facility.technecian || {}).oid);
                    if (findTechnician) {
                        let FIO = `${findTechnician.lastName} ${findTechnician.firstName[0]}.${findTechnician.middleName[0]}.`;
                        (facility.technecian || {}).oid = FIO;
                    } else {
                        (facility.technecian || {}).oid = "";
                    }
                });

                console.log("Техники привязаны к объектам \n");
            }).catch(function (error) {
                console.log("Техники не привязаны к объектам \n", error.message);
            });

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

export const reverse_list_facility = () => {
    return dispatch => {
        dispatch({
            type: REVERSE_LIST_FACILITY
        });
    }
};