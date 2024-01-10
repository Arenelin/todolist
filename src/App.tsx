import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TaskObjectType = {
    [key: string]: TaskType[]
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todolistId_1 = v1();
    const todolistId_2 = v1();
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ]);
    const [tasks, setTasks] = useState<TaskObjectType>({
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

    const addTask = (todolistId: string, titleValue: string) => {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title: titleValue, isDone: false}]});
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(t =>
                t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        });
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }

    const filteredTasks = (todolistId: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl));
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
    }

    const addNewTodolist = (title: string) => {
        const newTodolistId = v1();
        setTodolists([...todolists, {id: newTodolistId, title, filter: 'all'}]);
        setTasks({...tasks, [newTodolistId]: []});
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)});
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl));
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