import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

function App() {
    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React&TypeScript', isDone: false},
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: 'Milk', isDone: true},
        {id: 2, title: 'Meat', isDone: true},
        {id: 3, title: 'Apple', isDone: true},
        {id: 4, title: 'Fish', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasks1}/>
            <TodoList title="What to buy" tasks={tasks2}/>
        </div>
    );
}

export default App;
