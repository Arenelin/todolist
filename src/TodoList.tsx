import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    filteredTasks: (filterValue: FilterValuesType) => void
    addTask: (titleValue: string) => void
}

export function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState('');
    const listItems: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t => {
                const onClickRemoveTaskHandler = () => props.removeTask(t.id);
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <Button title={'x'} callback={onClickRemoveTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && (Boolean(title) && title.trim().length > 0)) {
            props.addTask(title);
            setTitle('');
        }
    }
    const onClickAddTaskHandler = () => {
        props.addTask(title);
        setTitle('');
    }
    const onClickFilteredAllTasksHandler = () => {
        props.filteredTasks('all')
    }
    const onClickFilteredActiveTasksHandler = () => {
        props.filteredTasks('active')
    }
    const onClickFilteredCompletedTasksHandler = () => {
        props.filteredTasks('completed')
    }
    const checkTrimInTitle = () => {
        return (!(Boolean(title) && title.trim().length > 0));
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitleHandler} onKeyDown={onKeyDownHandler}/>
                <Button title={'+'} callback={onClickAddTaskHandler} isDisabled={checkTrimInTitle()}/>
            </div>
            {listItems}
            <div>
                <Button title={'All'} callback={onClickFilteredAllTasksHandler}/>
                <Button title={'Active'} callback={onClickFilteredActiveTasksHandler}/>
                <Button title={'Completed'} callback={onClickFilteredCompletedTasksHandler}/>
            </div>
        </div>
    )
}