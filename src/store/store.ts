import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../reducers/todolists-reducer';
import {tasksReducer} from '../reducers/tasks-reducer';

const rootReducers = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export type AppRootType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers)