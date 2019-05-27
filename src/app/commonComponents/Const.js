export const IP_HOST = "https://cors-anywhere.herokuapp.com/http://217.71.138.9:4567";
export const ROOT_DIRECTORY = "/";


export const PATH_ADMINISTRATOR = "/administrator";//администратор
export const PATH_ADMINISTRATOR_USERS = "/users";//корневой путь к пользователям
export const PATH_ADMINISTRATOR_USERS_ACTUAL = "/actual";//актуальные пользователи
export const PATH_ADMINISTRATOR_USERS_ARCHIVED = "/archive";//удаленные пользователи

export const PATH_ADMINISTRATOR_CATALOG = "/catalog";//корневой путь к справочникам
export const PATH_ADMINISTRATOR_CATALOG_STREET = "/street";//улицы
export const PATH_ADMINISTRATOR_CATALOG_CYTY = "/city";//нас. пункты
export const PATH_ADMINISTRATOR_CATALOG_FACILITY = "/facility";//объекты
export const PATH_ADMINISTRATOR_CATALOG_SERVICEZONE = "/service_zone";//локации
export const PATH_ADMINISTRATOR_CATALOG_IMPLEMENTS = "/implements";//инвентарь
export const PATH_ADMINISTRATOR_CATALOG_COMPONENTTYPE = "/component_type";//комплектующие
export const PATH_ADMINISTRATOR_CATALOG_JOBTYPE = "/job_type";//типы работ
export const PATH_ADMINISTRATOR_CATALOG_CONTRACTOR = "/contractor";//контрагенты


export const PATH_CHIEFTO = "/chief_to";//начальник ТО
export const PATH_CHIEFTO_TECHNICIANS = "/technicians";//техники


export const PATH_CHIEF = "/chief";//начальник
export const PATH_ACCOUNTANT = "/accountant";//бухгалтер
export const PATH_STOREKEEPER = "/storekeeper";//кладовщик
export const PATH_LAWYER = "/lawyer";//юрист


/*Requests constants*/
export const PATH_USERS_ACTUAL = "/api/user/list?mode=0";
export const PATH_USERS_ALL = "/api/user/list?mode=1";
export const PATH_USERS_DELETED = "/api/user/list?mode=2";

export const PATH_STREETS_ACTUAL = "/api/street/list?mode=0";
export const PATH_STREETS_ALL = "/api/street/list?mode=1";
export const PATH_STREETS_DELETED = "/api/street/list?mode=2";

export const PATH_CITY_ACTUAL = "/api/city/list?mode=0";
export const PATH_CITY_ALL = "/api/city/list?mode=1";
export const PATH_CITY_DELETED = "/api/city/list?mode=2";

export const PATH_IMPLEMENTS_ACTUAL = "/api/implements/list?mode=0";
export const PATH_IMPLEMENTS_ALL = "/api/implements/list?mode=1";
export const PATH_IMPLEMENTS_DELETED = "/api/implements/list?mode=2";

export const PATH_COMPONENTTYPE_ACTUAL = "/api/componenttype/list?mode=0";
export const PATH_COMPONENTTYPE_ALL = "/api/componenttype/list?mode=1";
export const PATH_COMPONENTTYPE_DELETED = "/api/componenttype/list?mode=2";

export const PATH_JOBTYPE_ACTUAL = "/api/jobtype/list?mode=0";
export const PATH_JOBTYPE_ALL = "/api/jobtype/list?mode=1";
export const PATH_JOBTYPE_DELETED = "/api/jobtype/list?mode=2";

export const ALL_SHIFTS_PATH = "/api/shift/list?mode=0&level=7";
export const ALL_MAINTENANCE_PATH = "/api/maintenance/list?mode=0&level=7";

export const ALL_FACILITY_PATH = "/api/facility/list?mode=0&level=7";
export const ADD_FACILITY_PATH = "/api/facility/add";
export const DELETE_FACILITY_PATH = "/api/entity/delete?entity=Объект";
export const FACILITY_UPDATE_PATH = "/api/facility/update";

export const ALL_LOCATIONS_PATH = "/api/servicezone/list?mode=0&level=7";
export const ADD_LOCATION_PATH = "/api/servicezone/add";
export const DELETE_LOCATION_PATH = "/api/entity/delete?entity=Локация";
export const LOCATION_UPDATE_PATH = "/api/servicezone/update";

export const ALL_TECHNICIANS_PATH = "/api/technician/list?mode=0&level=7";
export const TECHNICIANS_UPDATE_PATH = "/api/technician/update";

export const ALL_CONTRACTOR_PATH = "/api/contractor/list?mode=0";

export const PATH_API_USER_LOGIN = "/api/user/login";//авторизация пользователя
export const PATH_API_USER_ADD = "/api/user/add";//создание пользователя
export const PATH_API_USER_UPDATE = "/api/user/update";//редактирование пользователя

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
                document.location.href = `${PATH_ADMINISTRATOR}${PATH_ADMINISTRATOR_USERS}${PATH_ADMINISTRATOR_USERS_ACTUAL}`;
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