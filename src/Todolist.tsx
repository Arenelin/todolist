import React from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filteredTasks: (valueFilter: FilterValuesType) => void
}

export function Todolist(props: TodolistPropsType) {

    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t =>
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <Button onClickHandler={() => props.removeTask(t.id)} title={'x'}></Button>
                </li>)}
        </ul>
        : <p>Tasks list is empty</p>

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'} onClickHandler={() => {
                }}/>
            </div>
            {tasksList}
            <div>
                <Button onClickHandler={() => props.filteredTasks('all')} title={'All'}/>
                <Button onClickHandler={() => props.filteredTasks('active')} title={'Active'}/>
                <Button onClickHandler={() => props.filteredTasks('completed')} title={'Completed'}/>
            </div>
        </div>
    )
}
