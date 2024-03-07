import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../../features/Todolists/tasksReducer/tasks-reducer';
import {todolistsReducer} from '../../features/Todolists/todolistsReducer/todolists-reducer';
import {AppRootState} from '../../App/store';
import React from 'react';
import {TaskPriorities, TaskStatuses} from '../../api/tasks-api';
import {appReducer} from '../../App/app-reducer/app-reducer';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    application: appReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus:'idle'
            }, {
                id: '2',
                title: 'JS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus:'idle'
            }
        ],
        ['todolistId2']: [
            {
                id: '1',
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus:'idle'
            }, {
                id: '2',
                title: 'React Book',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus:'idle'
            }
        ]
    },
    application: {status: 'idle', error: null}
};

export const storyBookStore =
    // @ts-ignore
    legacy_createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}

