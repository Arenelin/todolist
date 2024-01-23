import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistName,
    deleteTodolist,
    todolistsReducer
} from './state/todolists-reducer';
import {addNewTask, changeTaskStatus, changeTitleForTask, deleteTask, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';


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

    const dispatch = useDispatch()
    const todolists =
        useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    function changeFilter(value: FilterValues, todolistId: string) {
        dispatch(changeTodolistFilter(todolistId, value))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(deleteTodolist(todolistId))
    }

    const addNewTodolist = (title: string) => {
        const action = addTodolist(title)
        dispatch(action)
    }



    const changeTodolistTitle = (newTodolistTitle: string, todolistId: string,) => {
        dispatch(changeTodolistName(todolistId, newTodolistTitle))
    }

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => {
                    return (
                        <TodoList
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={tasksObj[tl.id]}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                }
            )}
        </div>
    );
}

export default AppWithRedux;

