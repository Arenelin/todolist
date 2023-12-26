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
    filter: FilterValuesType
    removeTask: (id: string) => void
    filteredTasks: (filterValue: FilterValuesType) => void
    addTask: (titleValue: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    const listItems: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t => {
                const onClickRemoveTaskHandler = () => props.removeTask(t.id);

                //Попытка изменения значения currentValue на противоположное приводит к вызову функции-обработчика
                const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);
                return (
                    <li key={t.id} className={t.isDone ? 'task-is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                        <span>{t.title}</span>
                        <Button title={'x'} callback={onClickRemoveTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            onClickAddTaskHandler()
        }
    }
    const onClickAddTaskHandler = () => {
        if (title.trim()) {
            props.addTask(title.trim());
        } else {
            setError(true);
        }
        setTitle('');

    }
    const onClickFilterTasksHandler = (filterValue: FilterValuesType) => {
        props.filteredTasks(filterValue);
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitleHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error-input' : ''}
                />
                <Button title={'+'} callback={onClickAddTaskHandler} isDisabled={!title}/>
            </div>
            {error && <div className="error">Error: title is required</div>}
            {listItems}
            <div>
                <Button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    title={'All'}
                    callback={() => onClickFilterTasksHandler('all')}
                />
                <Button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    title={'Active'}
                    callback={() => onClickFilterTasksHandler('active')}
                />
                <Button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    title={'Completed'}
                    callback={() => onClickFilterTasksHandler('completed')}
                />
            </div>
        </div>
    )
}