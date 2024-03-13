import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todolistsReducer} from '../reducers/todolists-reducer';
import {tasksReducer} from '../reducers/tasks-reducer';
import {thunk, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>