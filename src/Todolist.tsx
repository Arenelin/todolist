import React from 'react';
import {Button} from './Button';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export function Todolist(props: TodolistPropsType) {
    const taskItems: Array<JSX.Element> = [];
    for (let i = 0; i < props.tasks.length; i++) {
        const taskItem: JSX.Element =
            <li>
                <input type="checkbox" checked={props.tasks[i].isDone}/><span>{props.tasks[i].title}</span>
            </li>
        taskItems.push(taskItem);
    }


    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}