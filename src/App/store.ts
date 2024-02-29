import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../features/Todolists/todolistsReducer/todolists-reducer';
import {tasksReducer} from '../features/Todolists/tasksReducer/tasks-reducer';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
//При вызове функции выше на месте вызова редьюсеров в ключах сохраняется стейт
// и мы типизируем ниже как возврат этих функций, объектов того типа, которые они возвращают


// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof rootReducer> //Синтаксический сахар обычной типизации через объект
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>

// @ts-ignore
window.store = store;