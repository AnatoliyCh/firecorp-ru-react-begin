const initialState = {
    //token: 'null',
    dialogMode: 0,//0 - добавление, 1 - редактирование
};

export default (state = initialState, action) => {
    switch (action.type) {
        // case 'SET_TOKEN':
        //     return {...state, token: action.payload};
        default:
            return state
    }
};

// //действиe для сущности LoginPage(state.token)
// export function setToken(token) {
//     return {
//         type: 'SET_TOKEN',
//         payload: token,
//     }
// };
//действиe для сущности LoginPage(state.account)