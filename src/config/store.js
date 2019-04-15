import { createStore } from 'redux';
import { rootReducer } from './rootReducer'
//создаем стор
export const store = createStore(rootReducer);