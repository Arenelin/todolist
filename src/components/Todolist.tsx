import React from 'react';
import {Button} from './Button';
import {FilterValuesType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {UniversalCheckbox} from './UniversalCheckbox';
import {addNewTask, changeStatusTask, changeTitle, deleteTask} from '../reducers/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../store/store';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistProps = {
    todolistId: string
    title: string
    filter: FilterValuesType
    changeFilterTodolistForFilteredTasks: (todolistId: string, valueFilter: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {
        todolistId,
        title,
        filter,
        changeFilterTodolistForFilteredTasks,
        removeTodolist,
        changeTodolistTitle
    } = props;

    const dispatch = useDispatch()
    const tasks =
        useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistId])

    const tasksForTodolist = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks

    const tasksList: JSX.Element = tasksForTodolist.length
        ? <ul>
            {tasksForTodolist.map(t => {
                const onClickRemoveTaskHandler = () => dispatch(deleteTask(todolistId, t.id));

                const onChangeTaskTitle = (title: string) => {
                    dispatch(changeTitle(todolistId, t.id, title))
                }
                const onChangeTaskStatusHandler = (newValue: boolean) => {
                    dispatch(changeStatusTask(todolistId, t.id, newValue))
                }
                return (<li key={t.id} className={t.isDone ? 'task-is-done' : 'task'}>
                    <UniversalCheckbox checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                    <EditableSpan oldTitle={t.title} callback={onChangeTaskTitle}/>
                    <Button callback={onClickRemoveTaskHandler} title={'x'}/>
                </li>)
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const addTaskHandler = (title: string) => {
        dispatch(addNewTask(todolistId, title))
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title);
    }

    return (
        <div className="todoList">
            <h3>
                <EditableSpan oldTitle={title} callback={onChangeTodolistTitleHandler}/>
                <Button title={'x'} callback={removeTodolistHandler}/>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            {tasksList}
            <div>
                <Button className={filter === 'all' ? 'btn-active' : ''}
                        callback={() => changeFilterTodolistForFilteredTasks(todolistId, 'all')}
                        title={'All'}
                />
                <Button className={filter === 'active' ? 'btn-active' : ''}
                        callback={() => changeFilterTodolistForFilteredTasks(todolistId, 'active')}
                        title={'Active'}
                />
                <Button className={filter === 'completed' ? 'btn-active' : ''}
                        callback={() => changeFilterTodolistForFilteredTasks(todolistId, 'completed')}
                        title={'Completed'}
                />
            </div>
        </div>
    )
}