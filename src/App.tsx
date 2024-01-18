import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolist,
    changeTitleForTodolist,
    changeTodolistFilter,
    deleteTodolist,
    todolistsReducer
} from './reducers/todolistsReducer';
import {
    addNewTask,
    addTasksForNewTodolist,
    changeStatusTask,
    changeTitle,
    deleteTask,
    deleteTasksOfDeletedTodolist,
    tasksReducer
} from './reducers/tasksReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskObjType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addNewTask(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatchTasks(changeStatusTask(todolistId, taskId, newIsDoneValue))
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTask(todolistId, taskId))
    }

    const changeFilterTodolistForFilteredTasks = (todolistId: string, valueFilter: FilterValuesType) => {
        dispatchTodolists(changeTodolistFilter(todolistId, valueFilter))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(deleteTodolist(todolistId))
        dispatchTasks(deleteTasksOfDeletedTodolist(todolistId))
    }

    const addNewTodolist = (title: string) => {
        const newTodolistID = v1();
        dispatchTodolists(addTodolist(newTodolistID, title))
        dispatchTasks(addTasksForNewTodolist(newTodolistID))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTitle(todolistId, taskId, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTitleForTodolist(todolistId, title))
    }

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilterTodolistForFilteredTasks={changeFilterTodolistForFilteredTasks}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />)

            })}

        </div>
    );
}

export default App;