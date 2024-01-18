import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './components/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {
    addTodolist,
    changeTitleForTodolist,
    deleteTodolist,
    setNewFilterValue,
    todolistsReducer
} from './reducers/todolistsReducer';
import {
    addNewTask,
    addTasksForNewTodolist, changeStatusForTask, changeTitleForTask,
    deleteTask,
    deleteTasksForRemovedTodolist,
    tasksReducer
} from './reducers/tasksReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TaskObjectType = {
    [key: string]: TaskType[]
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todolistId_1 = v1();
    const todolistId_2 = v1();

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React&TypeScript', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Apple', isDone: false}
        ],
    })

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const addTask = (todolistId: string, titleValue: string) => {
        dispatchTasks(addNewTask(todolistId, titleValue));
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatchTasks(changeStatusForTask(todolistId, taskId, newIsDoneValue));
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTask(todolistId, taskId));
    }

    const filteredTasks = (todolistId: string, filterValue: FilterValuesType) => {
        dispatchTodolists(setNewFilterValue(todolistId, filterValue));
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(deleteTodolist(todolistId));
        dispatchTasks(deleteTasksForRemovedTodolist(todolistId));
    }

    const addNewTodolist = (title: string) => {
        const newTodolistId = v1();
        dispatchTodolists(addTodolist(newTodolistId, title));
        dispatchTasks(addTasksForNewTodolist(newTodolistId));
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTitleForTask(todolistId, taskId, title));
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTitleForTodolist(todolistId, title));
    }

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => {
                    return (
                        <TodoList
                            key={tl.id}
                            todolistId={tl.id}
                            titleForTodolist={tl.title}
                            tasks={tasks[tl.id]}
                            filter={tl.filter}
                            removeTask={removeTask}
                            filteredTasks={filteredTasks}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
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

export default App;