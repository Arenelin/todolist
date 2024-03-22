import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todolistsReducer} from '../reducers/todolist-reducer';
import {tasksReducer} from '../reducers/tasks-reducer';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";

const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

// @ts-ignore
window.store = store;