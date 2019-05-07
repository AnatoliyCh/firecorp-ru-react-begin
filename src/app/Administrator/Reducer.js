const initialState = {
    arrayUserArrays: [],//итоговый массив групп пользователей (<название>, <список>)
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARRAY_USER_ARRAYS':
            return {...state, arrayUserArrays: action.payload};
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