import * as allConst from "../commonComponents/Const";

const initialState = {
    arrayUserArrays: [],//итоговый массив групп пользователей (<title>, <data>)
    isSetAPIAddUser: false,//если добавляем пользователя
    indexUserToArray: [-1, -1],//id user в arrayUserArrays


    //списки
    arrStreet: [], //улицы
    sortHeaderStreet: ["name", "up"],//по какому заголовку сортируем и как

    arrCities: [], //нас. пункты
    arrImplements: [], //инвентарь
    arrComponentType: [], //комплектующие
    arrJobType: [], //типы работ
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
        case 'SET_SORT_HEADER':
            return {...state, sortHeaderStreet: action.payload};
        case 'SET_ARRAY_CITIES':
            return {...state, arrCities: action.payload};
        case 'SET_ARRAY_IMPLEMENTS':
            return {...state, arrImplements: action.payload};
        case 'SET_ARRAY_COMPONENTTYPE':
            return {...state, arrComponentType: action.payload};
        case 'SET_ARRAY_JOBTYPE':
            return {...state, arrJobType: action.payload};
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
//действиe для сущности arrStreet(добавление поле по которому сортируем)
export function setSortHeader(th, mode) {
    return {
        type: 'SET_SORT_HEADER',
        payload: [th, mode],
    }
};

//действиe для сущности arrCities(добавление списка нас. пунктов)
export function setArrCities(arr) {
    return {
        type: 'SET_ARRAY_CITIES',
        payload: arr,
    }
};

//действиe для сущности arrImplements(добавление списка инвентаря)
export function setArrImplements(arr) {
    return {
        type: 'SET_ARRAY_IMPLEMENTS',
        payload: arr,
    }
};

//действиe для сущности arrComponentType(добавление списка комплектующих)
export function setArrComponentType(arr) {
    return {
        type: 'SET_ARRAY_COMPONENTTYPE',
        payload: arr,
    }
};

//действиe для сущности arrJobType(добавление списка типов работ)
export function setArrJobType(arr) {
    return {
        type: 'SET_ARRAY_JOBTYPE',
        payload: arr,
    }
};