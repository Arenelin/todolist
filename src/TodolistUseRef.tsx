import React, {useRef} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>

    removeTask: (id: string) => void
    filteredTasks: (valueFilter: FilterValuesType) => void
    addTask: (titleValue: string) => void
}


export function Todolist(props: TodolistPropsType) {
    const taskTitleInput = useRef<HTMLInputElement>(null);

    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t =>
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <Button callback={() => props.removeTask(t.id)} title={'x'}/>
                </li>)}
        </ul>
        : <p>Tasks list is empty</p>

    const addTaskHandler = () => {
        if (taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value;
            props.addTask(newTaskTitle);
            taskTitleInput.current.value = '';
        }
    }
    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input ref={taskTitleInput}/>
                <Button callback={addTaskHandler} title={'+'}/>
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
