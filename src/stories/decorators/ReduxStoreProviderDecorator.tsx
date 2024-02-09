import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/reducers/tasks-reducer';
import {todolistsReducer} from '../../state/reducers/todolists-reducer';
import {AppRootState} from '../../state/store';
import React from 'react';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false}
        ],
        ['todolistId2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'React Book', isDone: false}
        ]
    }
};

// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}

