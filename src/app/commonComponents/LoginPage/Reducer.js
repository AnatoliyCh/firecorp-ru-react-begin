const initialState = {
    warning: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WARNING':
            return {...state, warning: action.payload};
        default:
            return state
    }
};

//действиe для сущности LoginPage(установка ошибки)
export function setWarning(warning) {
    return {
        type: 'SET_WARNING',
        payload: warning,
    }
}