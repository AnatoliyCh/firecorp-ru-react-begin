const initialState = {
    token: 'null',
    account: {
        typeId: '-',
        login: '-',
        password: '-',
        phone: '-',
        lastName: '-',
        firstName: '-',
        middleName: '-'
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {...state, token: action.payload};
        case 'SET_ACCOUNT':
            return {...state, account: action.payload};
        default:
            return state
    }
};

//действиe для сущности LoginPage(state.token)
export function setToken(token) {
    return {
        type: 'SET_TOKEN',
        payload: token,
    }
};

//действиe для сущности LoginPage(state.account)
export function setAccount(account) {
    return {
        type: 'SET_ACCOUNT',
        payload: account,
    }
};