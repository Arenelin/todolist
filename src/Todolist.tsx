import React, {useState, KeyboardEvent} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    filteredTasks: (valueFilter: FilterValuesType) => void
    addTask: (titleValue: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const [taskTitle, setTaskTitle] = useState('')

    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t => {
                const onClickRemoveTaskHandler = () => props.removeTask(t.id);
                return (<li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <Button callback={onClickRemoveTaskHandler} title={'x'}/>
                </li>)
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskTitle) {
            addTaskHandler()
        }
    }

    //handler - называют функции, которые обрабатывают событие, обязательно делать такую приписку для подобных функций,
    // чтобы их визуально отличать от обычных вычислительных функций

    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if (trimmedTaskTitle) {
            props.addTask(taskTitle);
        } else {
            alert('У тебя одни пробелы')
        }
        setTaskTitle('');
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}
                       onKeyDown={addTaskOnKeyDownHandler}/>
                <Button callback={addTaskHandler} title={'+'} isDisabled={!taskTitle}/>
            </div>
            {tasksList}
            <div>
                <Button callback={() => props.filteredTasks('all')} title={'All'}/>
                <Button callback={() => props.filteredTasks('active')} title={'Active'}/>
                <Button callback={() => props.filteredTasks('completed')} title={'Completed'}/>
            </div>
        </div>
    )
}
