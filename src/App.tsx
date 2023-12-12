import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')
    //если меняем форму представления тасок (один и тот же список показываем в разных вариантах),
    // значит не меняем исходный массив!!! То есть не осуществляем crud-операцию

    const filteredTasks = (valueFilter:FilterValuesType) => {
        setFilter(valueFilter);
    }

    let tasksForTodolist: Array<TaskType> = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;


    const removeTask = (id: number) => {
        const clearedTasks = tasks.filter(t => t.id !== id);
        setTasks(clearedTasks);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
            />
        </div>
    );
}

export default App;
