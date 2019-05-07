import * as allConst from "../commonComponents/Const";

const initialState = {
    arrayUserArrays: [],//итоговый массив групп пользователей (<название>, <список>)
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARRAY_USER_ARRAYS':
            return {...state, arrayUserArrays: action.payload};
        case 'SET_USER_IN_ARRAY':
            for (var item in state.arrayUserArrays)
                if (state.arrayUserArrays[item].title === allConst.ROLES.get(action.payload.typeId))
                    state.arrayUserArrays[item].data.push(action.payload);
            return {...state, arrayUserArrays: state.arrayUserArrays};
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