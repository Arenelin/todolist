import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {addTodolist} from './state/reducers/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {TaskType, TodoList} from './components/Todolist/TodoList';


export type FilterValues = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    console.log('re-render App')
    const dispatch = useDispatch()
    // const state = useSelector<AppRootState, any>(state => state)
    // const todolists: TodolistType[] = state.todolists
    const todolists =
        useSelector<AppRootState, TodolistType[]>(state => state.todolists)

    const addNewTodolist = useCallback((title: string) => {
        const action = addTodolist(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => <TodoList key={tl.id} todolist={tl}/>
            )}
        </div>
    );
}

export default AppWithRedux;

