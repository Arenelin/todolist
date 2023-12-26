import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    //Добавление задачи в исходный список
    const addTask = (titleValue: string) => {
        const newTask: TaskType = {id: v1(), title: titleValue, isDone: false};
        const newTasks: TaskType[] = [newTask, ...tasks];
        setTasks(newTasks);
    }

    //Сменить статус конкретной задачи. Используем именно приходящее значение,
    // так как статус задачи может быть не в двух значениях, а, например, в трех. И извне мы будем определять, какой у таски статус
    //Здесь именно лучше юзать map, а не мутабельно изменять значение через find
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState: TaskType[] = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t);
        setTasks(nextState);
    }

    //Удаление задачи из исходного списка
    const removeTask = (id: string) => {
        const clearedTasks = tasks.filter(t => t.id !== id);
        setTasks(clearedTasks);
    }

    //Фильтрация отображения задач в списке
    const filteredTasks = (valueFilter: FilterValuesType) => {
        setFilter(valueFilter);
    }

    let tasksForTodolist: TaskType[] = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                filter={filter}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;