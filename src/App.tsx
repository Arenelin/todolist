import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

function App() {
    const tasks1:Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
    ];
    const tasks2:Array<TaskType> = [
        {id: 1, title: 'Milk1', isDone: true},
        {id: 2, title: 'Meat', isDone: true},
        {id: 3, title: 'Apple', isDone: true},
        {id: 4, title: 'Fish', isDone: false},
    ];

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="What to buy" tasks={tasks2}/>
        </div>
    );
}

export default App;
