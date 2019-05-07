import * as allConst from "../commonComponents/Const";

const initialState = {
    arrayUserArrays: [],//итоговый массив групп пользователей (<title>, <data>)
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARRAY_USER_ARRAYS':
            return {...state, arrayUserArrays: action.payload};
        case 'SET_USER_IN_ARRAY':
            let tmpArr = [...state.arrayUserArrays];
            for (var item in tmpArr){
                if (tmpArr[item].title === allConst.ROLES.get(action.payload.typeId)){
                    tmpArr[item].data.push(action.payload);
                    break;
                }
            }
            return {...state, arrayUserArrays: tmpArr};
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
export function setUserInArray(user) {
    return {
        type: 'SET_USER_IN_ARRAY',
        payload: user,
    }
};