import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    //Переменные с id для каждого тудулиста
    const todolist_1 = v1();
    const todolist_2 = v1();

    //Стейт с тудулистами
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist_1, title: 'What to learn', filter: 'all'},
        {id: todolist_2, title: 'What to buy', filter: 'all'},
    ]);

    //Стейт с тасками для каждого тудулиста в отдельности
    const [tasksObj, setTasksObj] = useState({
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

    //Добавление новой таски в конкретный тудулист
    function addTask(title: string, todolistId: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        const newTasksForCurrentTodolist: TaskType[] = [newTask, ...tasksObj[todolistId]];
        setTasksObj({...tasksObj, [todolistId]: newTasksForCurrentTodolist});
    }

    //Смена статуса таски в конкретном тудулисте
    const changeStatus = (taskId: string, newTaskStatus: boolean, todolistId: string) => {
        const newUpdatedTasksForCurrentTodolist = tasksObj[todolistId].map(tl =>
            tl.id === taskId
                ? {...tl, isDone: newTaskStatus}
                : tl);
        setTasksObj({...tasksObj, [todolistId]: newUpdatedTasksForCurrentTodolist});
    }

    //Удаление таски из конкретного тудулиста
    function removeTask(id: string, todolistId: string) {
        const clearedTasks = tasksObj[todolistId].filter(t => t.id !== id);
        setTasksObj({...tasksObj, [todolistId]: clearedTasks});
    }

    //Фильтрация отображения тасок в конкретном тудулисте
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const updatedTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl);
        setTodolists(updatedTodolists);
    }

    //Удаление конкретного тудулиста
    const removeTodolist = (todolistId: string) => {
        const clearedTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(clearedTodolists);
        const clearedTasksObj = {...tasksObj};
        delete clearedTasksObj[todolistId];
        setTasksObj(clearedTasksObj);
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                    //Фильтрация отображения тасок, в зависимости от свойства filter в конкретном тудулисте
                    let tasksForTodoList: TaskType[] = tasksObj[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                    } else if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            removeTodolist={removeTodolist}
                        />)
                }
            )}
        </div>
    );
}
export default App;