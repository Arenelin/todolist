import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {TaskType, Todolist} from '../Todolist';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {addTodolist, getTodolists, TodolistDomainType} from '../../reducers/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type todolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskObjType = {
    [key: string]: TaskType[]
}

function App() {
    const dispatch = useAppDispatch();
    const todolists =
        useAppSelector<TodolistDomainType[]>(state => state.todolists)

    const addNewTodolist = useCallback((title: string) => {
        const action = addTodolist(title)
        dispatch(action)
    },[dispatch, addTodolist])

    useEffect(() => {
        dispatch(getTodolists())
    }, []);

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => {
                return <Todolist key={tl.id} todolist={tl}/>
            })}
        </div>
    );
}

export default App;