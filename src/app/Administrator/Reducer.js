import * as allConst from "../commonComponents/Const";

const initialState = {
    arrayUserArrays: [],//итоговый массив групп пользователей (<title>, <data>)
    isSetAPIAddUser: false,//если добавляем пользователя
    indexUserToArray: [-1, -1],//id user в arrayUserArrays

    //списки
    arrStreet: [], //улицы
    arrCities: [], //нас. пункты

};

export default (state = initialState, action) => {
    let tmpArr = [];
    let tmpIndUserArr = [];
    switch (action.type) {
        case 'SET_ARRAY_USER_ARRAYS':
            return {...state, arrayUserArrays: action.payload};
        case 'SET_API_USER_IN_ARRAY':
            tmpArr = [...state.arrayUserArrays];
            for (var item in tmpArr) {
                if (tmpArr[item].title === allConst.ROLES.get(action.payload.typeId)) {
                    tmpArr[item].data.push(action.payload);
                    break;
                }
            }
            return {...state, arrayUserArrays: tmpArr, isSetAPIAddUser: false};
        case 'UPDATE_API_USER':
            tmpIndUserArr = [...state.indexUserToArray];
            tmpArr = [...state.arrayUserArrays];
            if (tmpIndUserArr[0] !== -1 && tmpIndUserArr[1] !== -1) {
                tmpArr[tmpIndUserArr[0]].data[tmpIndUserArr[1]] = action.payload;
                tmpIndUserArr = [-1, -1];
            }
            return {...state, arrayUserArrays: tmpArr, indexUserToArray: tmpIndUserArr, isSetAPIAddUser: false};
        case 'SET_API_USER_IN_ARCHIVE':
            tmpIndUserArr = [...state.indexUserToArray];
            tmpArr = [...state.arrayUserArrays];
            if (tmpIndUserArr[0] !== -1 && tmpIndUserArr[1] !== -1) {
                tmpArr[tmpIndUserArr[0]].data.splice(tmpIndUserArr[1], 1);
                tmpIndUserArr = [-1, -1];
            }
            return {...state, arrayUserArrays: tmpArr, indexUserToArray: tmpIndUserArr};
        case 'IS_SET_API_ADD_USER':
            return {...state, isSetAPIAddUser: action.payload};
        case 'SET_INDEX_USER_TO_ARRAY':
            return {...state, indexUserToArray: action.payload};
        //списки
        case 'SET_ARRAY_STREET':
            return {...state, arrStreet: action.payload};
        case 'SET_ARRAY_CITIES':
            return {...state, arrStreet: action.payload};
        default:
            return state
    }
};

//действиe для сущности arrayUserArrays(добавление общего списка групп пользователей)
export function setArrayUserArrays(arrays) {
    return {
        type: 'SET_ARRAY_USER_ARRAYS',
        payload: arrays,
    }
};

//действиe для сущности arrayUserArrays(добавление нового пользователя)
export function setAPIUserInArray(user) {
    return {
        type: 'SET_API_USER_IN_ARRAY',
        payload: user,
    }
};

//действиe для сущности arrayUserArrays(редактирование пользователя)
export function updateAPIUser(newUser) {
    return {
        type: 'UPDATE_API_USER',
        payload: newUser,
    }
};

//действиe для сущности arrayUserArrays(изменение пользователю поля valid: true -> false)
export function setAPIUserInArchive() {
    return {
        type: 'SET_API_USER_IN_ARCHIVE',
        payload: '',
    }
};

//действиe для сущности isSetAPIAddUser(добавление нового пользователя и обновление списка текущих(для блокировки кнопки загрузки на время добавления))
export function isSetAPIAddUser(bool) {
    return {
        type: 'IS_SET_API_ADD_USER',
        payload: bool,
    }
};

//действиe для сущности indexUserToArr(добавление индексов для редактируемого/архивируемого пользователя)
export function setIndexUserToArray(indUserArr) {
    return {
        type: 'SET_INDEX_USER_TO_ARRAY',
        payload: indUserArr,
    }
};


//списки
//действиe для сущности arrStreet(добавление списка улиц)
export function setArrStreet(arr) {
    return {
        type: 'SET_ARRAY_STREET',
        payload: arr,
    }
};
//действиe для сущности arrStreet(добавление списка улиц)
export function setArrCities(arr) {
    return {
        type: 'SET_ARRAY_CITIES',
        payload: arr,
    }
};