import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './02/Todolist';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false},
    ]);

    //Удалить одну задачу
    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    //Удалить все задачи из списка
    function removeAllTasks() {
        setTasks([]);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      removeAllTasks={removeAllTasks}
            />
        </div>
    );
}

export default App;