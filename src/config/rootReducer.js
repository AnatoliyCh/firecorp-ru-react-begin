import { combineReducers } from 'redux';
import { tokenReducer } from '../app/commonComponents/reducer';

// export const initialState = {
// //     token: 'null',
// // };
// //
// // export function rootReducer(state = initialState) {
// //     return state
// // }

export const rootReducer = combineReducers({
    token: tokenReducer,
    //page: pageReducer,
    //user: userReducer,
});