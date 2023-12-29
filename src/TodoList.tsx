import {FilterValuesType} from './App';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newTaskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    //Создать title для будущей задачи
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value);
    }

    //Запустить функцию добавления задачи с помощью 'Enter'
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && newTaskTitle.trim()) {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    //Добавить задачу в список
    const addTask = () => {
        if (newTaskTitle.trim()) {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }

    }

    //Сменить фильтр отображения списка задач
    const changeFilter = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue, props.id);
    }

    const tasksList: JSX.Element[] = props.tasks.map(t => {

            //Удалить задачу из списка
            const onRemoveHandler = () => {
                props.removeTask(t.id, props.id)
            }

            //Изменить статус задачи на противоположный
            const onChangeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            }
            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input checked={t.isDone} type="checkbox" onChange={onChangeStatusTaskHandler}/>
                <span>{t.title}</span>
                <Button name={'x'} callback={onRemoveHandler}/>
            </li>
        }
    );

    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.id);
    }

    return (
        <div>
            <h3>{props.title} <Button name={'x'} callback={onClickRemoveTodolist}/></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <Button name={'+'} callback={addTask}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button className={props.filter === 'all' ? 'active-filter' : ''}
                        name={'All'}
                        callback={() => changeFilter('all')}/>
                <Button className={props.filter === 'active' ? 'active-filter' : ''}
                        name={'Active'}
                        callback={() => changeFilter('active')}/>
                <Button className={props.filter === 'completed' ? 'active-filter' : ''}
                        name={'Completed'}
                        callback={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}