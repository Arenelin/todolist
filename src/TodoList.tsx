import React from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filteredTasks: (filterValue: FilterValuesType) => void
}

export function TodoList(props: TodoListPropsType) {

    const listItems: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t =>
                <li>
                    <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <Button title={'x'} callback={() => props.removeTask(t.id)}/>
                </li>)}
        </ul>
        : <p>Tasks list is empty</p>

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'} callback={() => {
                }}/>
            </div>
            {listItems}
            <div>
                <Button title={'All'} callback={() => props.filteredTasks('all')}/>
                <Button title={'Active'} callback={() => props.filteredTasks('active')}/>
                <Button title={'Completed'} callback={() => props.filteredTasks('completed')}/>
            </div>
        </div>
    )
}