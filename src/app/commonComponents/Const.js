export const IP_HOST = "https://cors-anywhere.herokuapp.com/http://217.71.138.9:4567";
export const ROOT_DIRECTORY = "/";

export const PATH_ADMINISTRATOR = "/administrator";//администратор
export const PATH_ADMINISTRATOR_USERS_ACTUAL = "/users_actual";//актуальные пользователи
export const PATH_ADMINISTRATOR_USERS_ARCHIVED = "/users_archived";//удаленные пользователи

export const PATH_CHIEFTO = "/chiefto";//начальник ТО
export const PATH_CHIEFTO_TECHNICIANS = "/technicians";//техники

export const PATH_CHIEF = "/сhief";//начальник
export const PATH_ACCOUNTANT = "/accountant";//бухгалтер
export const PATH_STOREKEEPER = "/storekeeper";//кладовщик
export const PATH_LAWYER = "/lawyer";//юрист

/*Requests constants*/
export const ALL_USERS_PATH = "/api/user/list?mode=0";//<-- отказываемся

export const PATH_USERS_ACTUAL = "/api/user/list?mode=0";//--> переходим
export const PATH_USERS_ALL = "/api/user/list?mode=1";
export const PATH_USERS_DELETED = "/api/user/list?mode=2";
export const ALL_FACILITY_PATH = "/api/facility/list?mode=0&level=7";
export const ALL_LOCATIONS_PATH = "/api/servicezone/list?mode=0";
export const ALL_CONTRACTOR_PATH = "/api/contractor/list?mode=0";

export const PATH_API_USER_LOGIN = "/api/user/login";//авторизация пользователя
export const PATH_API_USER_ADD = "/api/user/add";//создание пользователя
export const PATH_API_USER_UPDATE = "/api/user/update";//редактирование пользователя

export const ADD_LOCATION_PATH = "/api/servicezone/add";

// Данные пользователя и проверка на отстутсвие данных о пользователе в localStorage
export const USER_DATA = JSON.parse(localStorage.getItem('UserData')) == null ? "" : JSON.parse(localStorage.getItem('UserData'));

//установка текущего пользователя
export function setCurrentUser(newCurrentUser) {
    localStorage.setItem('UserData', JSON.stringify(newCurrentUser));
}

//возвращение текущего пользователя
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('UserData')) == null ? 'empty' : JSON.parse(localStorage.getItem('UserData'));

}

export function getFIO(user) {
    return user === undefined ? "" : `${user.lastName} ${user.firstName[0]}.${user.middleName[0]}.`;
}

export const ROLES = new Map([
    [2, "Администратор"],
    [3, "Начальник ТО"],
    [4, "Техник"],
    [5, "Руководитель"],
    [6, "Бухгалтер"],
    [7, "Кладовщик"],
    [8, "Юрист"],
    [9, "Заказчик"],
]);

export function redirect(typeId) {
    if (getCurrentUser().typeId !== typeId)
        switch (getCurrentUser().typeId) {
            case 2:
                document.location.href = `${PATH_ADMINISTRATOR}${PATH_ADMINISTRATOR_USERS_ACTUAL}`;
                break;
            case 3:
                document.location.href = `${PATH_CHIEFTO}${PATH_CHIEFTO_TECHNICIANS}`;
                break;
            case 5:
                document.location.href = `${PATH_CHIEF}`;
                break;
            case 6:
                document.location.href = (`${PATH_ACCOUNTANT}`);
                break;
            case 7:
                document.location.href = `${PATH_STOREKEEPER}`;
                break;
            case 8:
                document.location.href = `${PATH_LAWYER}`;
                break;
            default://если нет такого id => на вход
                //setCurrentUser({});
                document.location.href = `${ROOT_DIRECTORY}`;
                break;
        }
}