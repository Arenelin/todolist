import {FilterValuesType} from './App';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitleTitle] = useState('');
    const tasksList: JSX.Element[] = props.tasks.map(t => {
            const onRemoveHandler = () => {
                props.removeTask(t.id)
            }
            return <li key={t.id}>
                <input checked={t.isDone} type="checkbox"/>
                <span>{t.title}</span>
                <Button name={'x'} callback={onRemoveHandler}/>
            </li>
        }
    )
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitleTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitleTitle('');
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitleTitle('');
    }
    const changeFilter = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <Button name={'+'} callback={addTask}/>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button name={'All'} callback={() => changeFilter('all')}/>
                <Button name={'Active'} callback={() => changeFilter('active')}/>
                <Button name={'Completed'} callback={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}