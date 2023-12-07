import React from 'react';
import {Button} from './Button';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export function TodoList(props: TodoListPropsType) {
    const listItems: Array<JSX.Element> = [];
    for (let i = 0; i < props.tasks.length; i++) {
        const listItem: JSX.Element =
            <li>
                <input type="checkbox" checked={props.tasks[i].isDone}/> <span>{props.tasks[i].title}</span>
            </li>
        listItems.push(listItem);
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <ul>
                {listItems}
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}