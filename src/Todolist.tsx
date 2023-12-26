import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
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
    filter: FilterValuesType
    removeTask: (id: string) => void
    filteredTasks: (valueFilter: FilterValuesType) => void
    addTask: (titleValue: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export function Todolist(props: TodolistPropsType) {
    const [taskTitle, setTaskTitle] = useState('');
    const [inputError, setInputError] = useState(false)

    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t => {
                const onClickRemoveTaskHandler = () => props.removeTask(t.id);
                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);
                return (<li key={t.id} className={t.isDone ? 'task-is-done' : 'task'}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeTaskStatus}/>
                    <span>{t.title}</span>
                    <Button callback={onClickRemoveTaskHandler} title={'x'}/>
                </li>)
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskTitle) {
            addTaskHandler();
        }
    }

    //handler - называют функции, которые обрабатывают событие, обязательно делать такую приписку для подобных функций,
    // чтобы их визуально отличать от обычных вычислительных функций

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            props.addTask(taskTitle.trim());

        } else {
            setInputError(true);
        }
        setTaskTitle('');
    };

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        inputError && setInputError(false);
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeTaskTitle}
                       onKeyDown={addTaskOnKeyDownHandler}
                       className={inputError ? 'input-error' : ''}
                />

                <Button callback={addTaskHandler} title={'+'} isDisabled={!taskTitle}/>
            </div>
            {inputError && <div className={'error'}>Error: title is required</div>}
            {tasksList}
            <div>
                <Button className={props.filter === 'all' ? 'btn-active' : ''}
                        callback={() => props.filteredTasks('all')}
                        title={'All'}
                />
                <Button className={props.filter === 'active' ? 'btn-active' : ''}
                        callback={() => props.filteredTasks('active')}
                        title={'Active'}
                />
                <Button className={props.filter === 'completed' ? 'btn-active' : ''}
                        callback={() => props.filteredTasks('completed')}
                        title={'Completed'}
                />
            </div>
        </div>
    )
}
