import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId:string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (todolistId:string, taskId: string) => void
    filteredTasks: (todolistId:string, valueFilter: FilterValuesType) => void
    addTask: (todolistId:string, titleValue: string) => void
    changeTaskStatus: (todolistId:string, taskId: string, newIsDoneValue: boolean) => void
    removeTodolist: (todolistId:string)=>void
}

export function Todolist(props: TodolistPropsType) {
    const tasksForTodolist = tl.filter === 'active' ? tasks[tl.id].filter(t=> !t.isDone) : tl.filter === 'completed' ? tasks[tl.id].filter(t=>t.isDone) : tasks[tl.id]
    const [taskTitle, setTaskTitle] = useState('');
    const [inputError, setInputError] = useState(false)

    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(t => {
                const onClickRemoveTaskHandler = () => props.removeTask(props.todolistId, t.id);
                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
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
            props.addTask(props.todolistId, taskTitle.trim());

        } else {
            setInputError(true);
        }
        setTaskTitle('');
    };

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        inputError && setInputError(false);
    }

    const removeTodolistHandler = ()=>{
        props.removeTodolist(props.todolistId);
    }

    return (
        <div className="todoList">
            <h3>{props.title} <Button title={'x'} callback={removeTodolistHandler}/></h3>
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
                        callback={() => props.filteredTasks(props.todolistId, 'all')}
                        title={'All'}
                />
                <Button className={props.filter === 'active' ? 'btn-active' : ''}
                        callback={() => props.filteredTasks(props.todolistId, 'active')}
                        title={'Active'}
                />
                <Button className={props.filter === 'completed' ? 'btn-active' : ''}
                        callback={() => props.filteredTasks(props.todolistId, 'completed')}
                        title={'Completed'}
                />
            </div>
        </div>
    )
}
