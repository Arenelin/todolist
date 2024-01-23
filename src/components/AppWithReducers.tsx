import React, {useReducer} from 'react';
import '../App.css';
import {TaskType, TodoList} from '../TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistName,
    deleteTodolist,
    todolistsReducer
} from '../state/todolists-reducer';
import {addNewTask, changeTaskStatus, changeTitleForTask, deleteTask, tasksReducer} from '../state/tasks-reducer';


export type FilterValues = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: TaskType[]
}

function AppWithReducers() {
    const todolist_1 = v1();
    const todolist_2 = v1();

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolist_1, title: 'What to learn', filter: 'all'},
        {id: todolist_2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
        [todolist_1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolist_2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    });

    function addTask(title: string, todolistId: string) {
        dispatchTasksObj(addNewTask(todolistId, title))
    }

    const changeStatus = (taskId: string, newTaskStatus: boolean, todolistId: string) => {
        dispatchTasksObj(changeTaskStatus(todolistId, taskId, newTaskStatus))
    }

    function removeTask(id: string, todolistId: string) {
        dispatchTasksObj(deleteTask(todolistId, id))
    }

    function changeFilter(value: FilterValues, todolistId: string) {
        dispatchTodolists(changeTodolistFilter(todolistId, value))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(deleteTodolist(todolistId))
        dispatchTasksObj(deleteTodolist(todolistId))
    }

    const addNewTodolist = (title: string) => {
        const action = addTodolist(title)
        dispatchTodolists(action)
        dispatchTasksObj(action)
    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispatchTasksObj(changeTitleForTask(todolistId, taskId, title))
    }

    const changeTodolistTitle = (newTodolistTitle: string, todolistId: string,) => {
        dispatchTodolists(changeTodolistName(todolistId, newTodolistTitle))
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

export default AppWithReducers;

