import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
//При вызове функции выше на месте вызова редьюсеров в ключах сохраняется стейт
// и мы типизируем ниже как возврат этих функций, объектов того типа, которые они возвращают
//

export type AppRootState = ReturnType<typeof rootReducer> //Синтаксический сахар обычной типизации через объект

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;