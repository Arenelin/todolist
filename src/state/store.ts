import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './reducers/todolists-reducer';
import {tasksReducer} from './reducers/tasks-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
//При вызове функции выше на месте вызова редьюсеров в ключах сохраняется стейт
// и мы типизируем ниже как возврат этих функций, объектов того типа, которые они возвращают

export const store = createStore(rootReducer);

export type AppRootState = ReturnType<typeof rootReducer> //Синтаксический сахар обычной типизации через объект

// @ts-ignore
window.store = store;