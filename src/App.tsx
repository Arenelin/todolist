import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    //Добавляем новую таску, изменяя исходный массив (ссылку (иммутабельность)) - crud-операция
    function addTask(title: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        const newTasks: TaskType[] = [newTask, ...tasks];
        setTasks(newTasks);
    }

    //Если мы добавляем или удаляем задачу, то изменяем именно исходный массив,
    //присваивая ему новое значение
    function removeTask(id: string) {
        const clearedTasks = tasks.filter(t => t.id !== id);
        setTasks(clearedTasks);
    }

    //Фильтруя, мы не имеем права изменять исходный массив с данными!!!
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    //Показываем те задачи из списка, которые соответствуют условию и значению фильтра
    let tasksForTodoList: TaskType[] = tasks;
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
                addTask={addTask}
            />
        </div>
    );
}
export default App;