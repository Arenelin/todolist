import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React&TypeScript', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')

    //Удаление задачи из списка (crud-операция)
    const removeTask = (id: number) => {
        const clearedTasks = tasks.filter(t => t.id !== id);
        setTasks(clearedTasks);
    }

    //Фильтрация отображения задач в списке (не crud-операция)
    const filteredTasks = (filterValue: FilterValuesType) => {
        setFilter(filterValue);
    }
    const tasksForTodolist: Array<TaskType> = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}/>
        </div>
    );
}

export default App;
