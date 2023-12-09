import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');


    //Если мы добавляем или удаляем задачу, то изменяем именно исходный массив,
    //присваивая ему новое значение
    function removeTask(id: number) {
        const clearedTasks = tasks.filter(t => t.id !== id);
        setTasks(clearedTasks);
    }


    //Фильтруя, мы не имеем права изменять исходный массив с данными!!!
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList: Array<TaskType> = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    } else if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }


    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
