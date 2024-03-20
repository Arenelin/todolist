import React from 'react';
import {Provider} from 'react-redux';
import {AppRootState} from '../../store/store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../../reducers/tasks-reducer';
import {todolistsReducer} from '../../reducers/todolist-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", addedDate: '', order: 1, filter: "all", entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", addedDate: '', order: 1, filter: "all", entityStatus: 'idle'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: '1',
                title: "HTML&CSS",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.High,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: "JS",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.High,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 1,
                addedDate: '',
                entityStatus: 'idle'
            },
        ],
        ["todolistId2"]: [
            {
                id: '1',
                title: "Milk",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.High,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 1,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: "Bread",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.High,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 1,
                addedDate: '',
                entityStatus: 'idle'
            }
        ]
    },
    app: {error: null, status: 'idle'}
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState & undefined);

const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {

    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};

export default ReduxStoreProviderDecorator;