export const IP_HOST = 'https://cors-anywhere.herokuapp.com/http://217.71.138.9:4567';
export const ROOT_DIRECTORY = '/';
export const PATH_ADMINISTRATOR = '/administrator';//Администратор
export const PATH_CHIEFTO = '/chiefto';//Начальник ТО
export const PATH_CHIEF = '/сhief';//Начальник
export const PATH_ACCOUNTANT = '/accountant';//Бухгалтер
export const PATH_STOREKEEPER = '/storekeeper';//Кладовщик
export const PATH_LAWYER = '/lawyer';//Юрист

/*Requests constants*/
export const ALL_USERS_PATH = '/api/user/list';
export const ALL_FACILITY_PATH = '/api/facility/list';

// Данные пользователя и проверка на отстутсвие данных о пользователе в localStorage
export const USER_DATA = JSON.parse(localStorage.getItem('UserData')) == null ? "" : JSON.parse(localStorage.getItem('UserData'));

export const ROLES = new Map([
    [2, 'Администратор'],
    [3, 'Начальник ТО'],
    [5, 'Начальник'],
    [6, 'Бухгалтер'],
    [7, 'Кладовщик'],
    [8, 'Юрист'],
    [4, 'Техник']
]);
