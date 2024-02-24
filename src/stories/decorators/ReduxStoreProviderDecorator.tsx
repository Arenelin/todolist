import React from 'react';
import {Provider} from 'react-redux';
import {AppRootState, store} from '../../store/store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../../reducers/tasks-reducer';
import {todolistsReducer} from '../../reducers/todolists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: '1', title: "Milk", isDone: false
            },
            {id: '2', title: "React Book", isDone: true}
        ]
    }
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