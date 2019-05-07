const initialState = {
    dialogMode: 0,//0 - добавление, 1 - редактирование
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DIALOG_MODE':
            return {...state, dialogMode: action.payload};
        default:
            return state
    }
};

//действиe для сущности dialogMode(создание или редактирование)
export function setDialogMode(mode) {
    return {
        type: 'SET_DIALOG_MODE',
        payload: mode,
    }
};