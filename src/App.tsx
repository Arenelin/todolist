import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React&TypeScript', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    //Добавление задачи в список (crud-операция)
    const addTask = (titleValue: string) => {
        const newTask: TaskType = {id: v1(), title: titleValue, isDone: false};
        const newTasksList: TaskType[] = [newTask, ...tasks];
        setTasks(newTasksList);
    }

    //Сменить статус задачи (crud-операция). На её месте может быть любой апдейт.
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const newTasks = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t);
        setTasks(newTasks);
    }

    //Удаление задачи из списка (crud-операция)
    const removeTask = (id: string) => {
        const clearedTasks = tasks.filter(t => t.id !== id);
        setTasks(clearedTasks);
    }

    //Фильтрация отображения задач в списке (не crud-операция)
    const filteredTasks = (filterValue: FilterValuesType) => {
        setFilter(filterValue);
    }
    const tasksForTodolist: TaskType[] = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    return (
        <div className="App">
            <TodoList title="What to learn"
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
